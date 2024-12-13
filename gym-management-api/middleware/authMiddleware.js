module.exports = (requiredRole) => {
    return (req, res, next) => {
      // Check if session exists
      if (!req.session || !req.session.userId) {
        return res.status(401).json({ message: "Please log in to access this resource." });
      }
  
      // Check if the user has the required role
      if (requiredRole && req.session.role !== requiredRole) {
        return res.status(403).json({ message: "You do not have permission to access this resource." });
      }
  
      // Proceed to the next middleware or route handler
      next();
    };
  };
  