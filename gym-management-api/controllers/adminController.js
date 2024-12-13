const db = require('../db/db');

exports.getTotals = (req, res) => {
    const queries = {
      members: 'SELECT COUNT(*) AS count FROM members',
      employees: 'SELECT COUNT(*) AS count FROM employees',
      equipments: 'SELECT SUM(quantity) AS count FROM equipments',
      courses: 'SELECT COUNT(*) AS count FROM courses',
    };
  
    Promise.all([
      new Promise((resolve, reject) =>
        db.query(queries.members, (err, results) => (err ? reject(err) : resolve(results[0].count)))
      ),
      new Promise((resolve, reject) =>
        db.query(queries.employees, (err, results) => (err ? reject(err) : resolve(results[0].count)))
      ),
      new Promise((resolve, reject) =>
        db.query(queries.equipments, (err, results) => (err ? reject(err) : resolve(results[0].count)))
      ),
      new Promise((resolve, reject) =>
        db.query(queries.courses, (err, results) => (err ? reject(err) : resolve(results[0].count)))
      ),
    ])
      .then(([memberCount, employeeCount, equipmentCount, courseCount]) => {
        res.json({ memberCount, employeeCount, equipmentCount, courseCount });
      })
      .catch((error) => res.status(500).json({ error: 'Error fetching totals', details: error }));
  };