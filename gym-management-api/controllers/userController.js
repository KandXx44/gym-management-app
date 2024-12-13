const db = require('../db/db'); // Adjust the path to your DB connection
const bcrypt = require('bcrypt');

exports.getUserProfile = (req, res) => {
  const userId = req.params.id;

  const query = 'SELECT * FROM members WHERE member_id = ?'; // Assuming you fetch from members table
  db.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ success: false, message: 'Database error' });

    if (results.length > 0) {
      return res.json(results[0]); // Send back the user data
    } else {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
  });
};

exports.updateUserProfile = async (req, res) => {
  const { member_id, name, age, gender, contact, height, weight, password } = req.body;

  // Check Age
  if (typeof age !== 'number' || age < 0) {
    return res.status(404).json({ success: false, message: 'Age must be a number greater than 0' });
  }
  // Check Gender
  if (!['male', 'female'].includes(gender)) {
    return res.status(404).json({ success: false, message: 'Gender must be male or female' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'UPDATE members SET name = ?, age = ?, gender = ?, contact = ?, height = ?, weight = ?, password = ? WHERE member_id = ?';
  db.query(query, [name, age, gender, contact, height, weight, hashedPassword, member_id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });
      res.json({ success: true, message: 'User profile updated successfully' });
  });
};

exports.signUpCourse = (req, res) => {
  const { member_id, course_id } = req.body;

  const checkQuery = 'SELECT * FROM member_courses WHERE member_id = ? AND course_id = ?';
  db.query(checkQuery, [member_id, course_id], (err, results) => {
    if (err) {
      console.error('Error checking if member is already signed up:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    if (results.length > 0) {
      return res.status(400).json({ message: 'You are already signed up for this course' });
    }

    const insertQuery = 'INSERT INTO member_courses (member_id, course_id) VALUES (?, ?)';
    db.query(insertQuery, [member_id, course_id], (err, results) => {
      if (err) {
        console.error('Error signing up member to course:', err);
        return res.status(500).json({ message: 'Database error', error: err });
      }

      res.json({ message: 'Member successfully signed up for the course' });
    });
  });
};

exports.getCourses = (req, res) => {
  const id = req.params.id;

  const sqlQuery = `
    SELECT mc.id, c.course_id, c.name, c.course_date, c.course_time, c.duration, c.coach
    FROM member_courses mc
    JOIN courses c ON mc.course_id = c.course_id
    WHERE mc.member_id = ?
  `;
  
  db.query(sqlQuery, [id], (err, results) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }

    res.json(results);
  });
};

exports.dropCourse = (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM member_courses WHERE id = ?';
  db.query(query, [id], (err, results) => {
      if (err) return res.status(500).json({ success: false, message: 'Database error', error: err });
      res.json({ success: true, message: 'Course deleted successfully' });
  });
};