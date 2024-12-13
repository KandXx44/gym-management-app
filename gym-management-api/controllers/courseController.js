const db = require('../db/db');

exports.getAllCourses = (req, res) => {
  db.query('SELECT * FROM courses', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

exports.getCourse = (req, res) => {
  const courseId = req.params.id;
  db.query('SELECT * FROM courses WHERE id = ?', [courseId], (err, results) => {
    if (err) return res.status(500).json(err);
    if (results.length === 0) return res.status(404).json({ message: 'Course not found' });
    res.json(results[0]);
  });
};

exports.createCourse = (req, res) => {
  const { id, name, course_date, course_time, duration, coach } = req.body;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.course_date)) {
    return res.status(404).json({ success: false, message: 'Course date must be in the format YYYY-MM-DD.' });
  }
  if (!/^\d{2}:\d{2}$/.test(data.course_time)) {
    return res.status(404).json({ success: false, message: 'Course time must be in the format HH:MM.' });
  }
  if (typeof duration !== 'number' || duration < 0) {
    return res.status(404).json({ success: false, message: 'Duration must be a number greater than 0' });
  }

  const query = `
      INSERT INTO courses (course_id, name, course_date, course_time, duration, coach)
      VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [id, name, course_date, course_time, duration, coach], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: 'Failed to add course', error: err });
      }
      res.json({ success: true, message: 'Course added successfully' });
  });
};

exports.updateCourse = (req, res) => {
  const courseId = req.params.id;
  const { name, course_date, course_time, duration, coach } = req.body;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.course_date)) {
    return res.status(404).json({ success: false, message: 'Course date must be in the format YYYY-MM-DD.' });
  }
  if (!/^\d{2}:\d{2}$/.test(data.course_time)) {
    return res.status(404).json({ success: false, message: 'Course time must be in the format HH:MM.' });
  }
  if (typeof duration !== 'number' || duration < 0) {
    return res.status(404).json({ success: false, message: 'Duration must be a number greater than 0' });
  }

  db.query(
    'UPDATE courses SET name = ?, course_date = ?, course_time = ?, duration = ?, coach = ? WHERE id = ?',
    [name, course_date, course_time, duration, coach, courseId],
    (err, results) => {
      if (err) return res.status(500).json(err);
      res.json({ message: 'Course updated successfully' });
    }
  );
};

exports.deleteCourse = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM courses WHERE id = ?';
  db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });
      res.json({ success: true, message: 'Course deleted successfully' });
  });
};