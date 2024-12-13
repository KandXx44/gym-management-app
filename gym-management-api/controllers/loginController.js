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
        req.session.userId = member.member_id;
        req.session.userRole = 'member';
        return res.json({ success: true, isAdmin: false });
      }
      return res.json({ success: false, message: 'Invalid password' });
    }

    // Check in employees table
    const [employeeResults] = await db.promise().query('SELECT * FROM employees WHERE employee_id = ?', [id]);
    if (employeeResults.length > 0) {
      const employee = employeeResults[0];
      const isMatch = await bcrypt.compare(password, employee.password);
      if (isMatch) {
        req.session.userId = employee.employee_id;
        req.session.userRole = employee.is_admin ? 'admin' : 'employee';
        return res.json({ success: true, isAdmin: employee.is_admin });
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

exports.session = (req, res) => {
  if (req.session.userId) {
    res.json({
      userId: req.session.userId,
      userRole: req.session.userRole
    });
  } else {
    res.status(401).json({ message: 'No active session' });
  }
};

exports.logout = (req, res) => {
  if (!req.session) {
    return res.status(400).json({ success: false, message: 'No active session to log out' });
  }

  req.session.destroy((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).json({ success: false, message: 'Failed to log out' });
    }
    res.clearCookie('connect.sid'); // Clear the session cookie
    return res.json({ success: true, message: 'Logged out successfully' });
  });
};
