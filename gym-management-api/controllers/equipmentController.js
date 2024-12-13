const db = require('../db/db');

exports.getAllEquipments = (req, res) => {
  db.query('SELECT * FROM equipments', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getEquipment = (req, res) => {
  const id = req.params.id;
  db.query('SELECT * FROM equipments WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Equipment not found' });
    res.json(results[0]);
  });
};

exports.createEquipment = (req, res) => {
  const { id, name, category, quantity } = req.body;

  // Check quantity
  if (typeof quantity !== 'number' || quantity < 0) {
    return res.status(404).json({ success: false, message: 'Quantity must be a number greater or equal to 0' });
  }

  const query = `
      INSERT INTO equipments (equipment_id, name, category, quantity)
      VALUES (?, ?, ?, ?)
  `;
  db.query(query, [id, name, category, quantity], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: 'Failed to add equipment', error: err });
      }
      res.json({ success: true, message: 'Equipment added successfully' });
  });
};

exports.editEquipment = (req, res) => {
  const { id, name, category, quantity } = req.body;

  // Check quantity
  if (typeof quantity !== 'number' || quantity < 0) {
    return res.status(404).json({ success: false, message: 'Quantity must be a number greater or equal to 0' });
  }

  const query = 'UPDATE equipments SET name = ?, category = ?, quantity = ? WHERE id = ?';
  db.query(query, [name, category, quantity, id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });
      res.json({ success: true, message: 'Equipment updated successfully' });
  });
};

exports.deleteEquipment = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM equipments WHERE id = ?';
  db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });
      res.json({ success: true, message: 'Equipment deleted successfully' });
  });
};