const jwt = require('jsonwebtoken');

const extractAndVerifyToken = (req, res, next) => {
  // Get the Authorization header
  const authHeader = req.headers['authorization'];

  // Check if the header exists and starts with "Bearer "
  if (authHeader && authHeader.startsWith('Bearer ')) {
    // Extract the token without the "Bearer " prefix
    const token = authHeader.slice(7); // 7 is the length of "Bearer "

    // Verify and decode the token (replace 'your-secret-key' with your actual secret key)
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        // Token verification failed (e.g., token expired or invalid)
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Token is valid; attach the decoded token to the request object
      req.user = decodedToken;
      console.log(req.user)
      next();
    });
  } else {
    // No Authorization header with "Bearer " prefix found
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = extractAndVerifyToken;