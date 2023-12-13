const jwt = require("jsonwebtoken");

require('dotenv').config();

const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {

    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(401).json({ error: "Token not provided" });
    }
  
    try {
      const token = authHeader.split(" ")[1];
  
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: "Invalid token" });
        }
  
        req.userId = decoded.id;
        req.username = decoded.username;
        next();
      });
    } catch (error) {
      //token split error verdiğinde burada
  
      return res.status(403).json({ error: "Invalid token" });
    }
  }

module.exports = verifyToken