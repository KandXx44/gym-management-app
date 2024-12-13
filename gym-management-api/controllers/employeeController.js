const db = require('../db/db');
const bcrypt = require('bcrypt');

exports.getAllEmployees = (req, res) => {
  db.query('SELECT * FROM employees', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getEmployee = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM employees WHERE id = ? OR employee_id = ?', [id, id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Employee not found' });
    res.json(results[0]);
  });
};

exports.createEmployee = async (req, res) => {
  const { id, name, position, contact, is_admin, password } = req.body;

  if (typeof is_admin !== 'boolean') {
    return res.status(404).json({ success: false, message: 'Is_admin must be a boolean value.' });
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
      INSERT INTO employees (employee_id, name, position, contact, is_admin, password)
      VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [id, name, position, contact, is_admin, hashedPassword], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: 'Failed to add employee', error: err });
      }
      res.json({ success: true, message: 'Employee added successfully' });
  });
};

exports.editEmployee = async (req, res) => {
  const { id, name, position, contact, is_admin, password } = req.body;

  if (typeof is_admin !== 'boolean') {
    return res.status(404).json({ success: false, message: 'Is_admin must be a boolean value.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'UPDATE employees SET name = ?, position = ?, contact = ?, is_admin = ?, password = ? WHERE id = ?';
  db.query(query, [name, position, contact, is_admin, hashedPassword, id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });
      res.json({ success: true, message: 'Employee updated successfully' });
  });
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM employees WHERE id = ?';
  db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });
      res.json({ success: true, message: 'Employee deleted successfully' });
  });
};