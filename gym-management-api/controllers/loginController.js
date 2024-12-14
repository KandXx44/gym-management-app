const db = require('../db/db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { id, password } = req.body;

  try {
    // Check in members table
    const [memberResults] = await db.promise().query('SELECT * FROM members WHERE member_id = ?', [id]);
    if (memberResults.length > 0) {
      const member = memberResults[0];
      const isMatch = await bcrypt.compare(password, member.password);
      if (isMatch) {
        const userId = member.member_id;
        const userRole = 'user';

        // Insert or update the user login record
        db.query('SELECT * FROM user_login WHERE user_id = ?', [userId], (err, loginResults) => {
          if (err) return res.status(500).json({ success: false, message: 'Database error' });

          if (loginResults.length === 0) {
            // Insert new record if not exists
            db.query('INSERT INTO user_login (user_id, user_role) VALUES (?, ?)', [userId, userRole], (err) => {
              if (err) return res.status(500).json({ success: false, message: 'Failed to log in' });
            });
          } else {
            // Optionally update the role if needed
            db.query('UPDATE user_login SET user_role = ? WHERE user_id = ?', [userRole, userId], (err) => {
              if (err) return res.status(500).json({ success: false, message: 'Failed to log in' });
            });
          }
        });

        return res.json({ success: true, isAdmin: false, user_id: userId, user_role: userRole });
      }
      return res.json({ success: false, message: 'Invalid password' });
    }

    // Check in employees table
    const [employeeResults] = await db.promise().query('SELECT * FROM employees WHERE employee_id = ?', [id]);
    if (employeeResults.length > 0) {
      const employee = employeeResults[0];
      const isMatch = await bcrypt.compare(password, employee.password);
      if (isMatch) {
        const userId = employee.employee_id;
        const userRole = employee.is_admin ? 'admin' : 'employee';

        // Insert or update the user login record
        db.query('SELECT * FROM user_login WHERE user_id = ?', [userId], (err, loginResults) => {
          if (err) return res.status(500).json({ success: false, message: 'Database error' });

          if (loginResults.length === 0) {
            // Insert new record if not exists
            db.query('INSERT INTO user_login (user_id, user_role) VALUES (?, ?)', [userId, userRole], (err) => {
              if (err) return res.status(500).json({ success: false, message: 'Failed to log in' });
            });
          } else {
            // Optionally update the role if needed
            db.query('UPDATE user_login SET user_role = ? WHERE user_id = ?', [userRole, userId], (err) => {
              if (err) return res.status(500).json({ success: false, message: 'Failed to log in' });
            });
          }
        });

        return res.json({ success: true, isAdmin: employee.is_admin, user_id: userId, user_role: userRole });
      }
      return res.json({ success: false, message: 'Invalid password' });
    }

    // If not found in either table
    return res.json({ success: false, message: 'Invalid username or password' });

  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ success: false, message: 'Database error', error: err });
  }
};

exports.check = (req, res) => {
  const { user_id } = req.params;  // Correctly access user_id from params

  if (!user_id) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Query the user_login table to check if the user is logged in
    db.query('SELECT * FROM user_login WHERE user_id = ?', [user_id], (err, rows) => {
      if (err) {
        console.error('Error checking login:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (rows.length > 0) {
        // User exists in the login table
        res.status(200).json({ loggedIn: true, user: rows[0] });
      } else {
        // User is not logged in
        res.status(401).json({ loggedIn: false, message: 'User not logged in' });
      }
    });
  } catch (error) {
    console.error('Error during authentication check:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
  const { user_id } = req.body;

  db.query('DELETE FROM user_login WHERE user_id = ?', [user_id], (err) => {
    if (err) return res.status(500).json({ success: false, message: 'Failed to log out' });
    res.json({ success: true, message: 'Logged out successfully' });
  });
};
