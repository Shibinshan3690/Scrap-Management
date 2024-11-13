const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    // Check if the token exists
    if (!token) {
        return res.status(403).json({
            status: "fail",
            message: "A token is required for authentication"
        });
    }

    try {
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET_SUPPLIRE);
        req.supplier = decoded; // Attach decoded user info to the request object
    } catch (error) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid Token"
        });
    }
    return next();
};

module.exports = verifyToken;
