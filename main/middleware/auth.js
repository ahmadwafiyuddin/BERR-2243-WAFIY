const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // 1. Get the token from the header
        const token = req.headers.authorization.split(" ")[1];
        
        // 2. Check if token is valid using your SECRET
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        
        // 3. Add the user data to the request so other files can use it
        req.userData = { userId: decodedToken.userId, role: decodedToken.role };
        
        next(); // Let them pass
    } catch (error) {
        res.status(401).json({ message: "Auth failed! You need to login first." });
    }
};