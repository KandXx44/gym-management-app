const db = require('../db/db');
const bcrypt = require('bcrypt');

exports.getAllMembers = (req, res) => {
  db.query('SELECT * FROM members', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getMember = (req, res) => {
  const id = req.params.id;

  db.query('SELECT * FROM members WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Member not found' });
    res.json(results[0]);
  });
};

exports.createMember = async (req, res) => {
  const { id, name, age, gender, contact, height, weight, password } = req.body;

  // Check Age
  if (typeof age !== 'number' || age < 0) {
    return res.status(404).json({ success: false, message: 'Age must be a number greater than 0' });
  }
  // Check Gender
  if (!['Male', 'Female'].includes(gender)) {
    return res.status(404).json({ success: false, message: 'Gender must be male or female' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
      INSERT INTO members (member_id, name, age, gender, contact, height, weight, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [id, name, age, gender, contact, height, weight, hashedPassword], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: 'Failed to add member', error: err });
      }
      res.json({ success: true, message: 'Member added successfully' });
  });
};

exports.editMember = async (req, res) => {
  const { id, name, age, gender, contact, height, weight, password } = req.body;

  // Check Age
  if (typeof age !== 'number' || age < 0) {
    return res.status(404).json({ success: false, message: 'Age must be a number greater than 0' });
  }
  // Check Gender
  if (!['Male', 'Female'].includes(gender)) {
    return res.status(404).json({ success: false, message: 'Gender must be male or female' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'UPDATE members SET name = ?, age = ?, gender = ?, contact = ?, height = ?, weight = ?, password = ? WHERE id = ?';
  db.query(query, [name, age, gender, contact, height, weight, hashedPassword, id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });
      res.json({ success: true, message: 'Member updated successfully' });
  });
};

exports.deleteMember = (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM members WHERE id = ?';
  db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });
      res.json({ success: true, message: 'Member deleted successfully' });
  });
};

exports.searchMember = (req, res) => {
  const { query } = req.query;

  const sqlQuery = `SELECT * FROM members WHERE name LIKE ? OR member_id LIKE ? OR contact LIKE ? OR gender LIKE ? OR age LIKE ?`;
  const searchTerm = `%${query}%`;

  db.query(sqlQuery, [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ success: false, message: 'Database error', error: err });
    }
    
    return res.json(results);
  });
};