const jwt = require('jsonwebtoken');

const verifyUserToken=(req, res, next) => {
    const incomeToken = req.headers['authorization'];
    const token=incomeToken.split(" ")[1]
console.log('sucesss')
    // Check if the token exists
    if (!token) {
        return res.status(403).json({
            status: "fail",
            message: "A token is required for authentication"
        });
    }

    try {
        // Verify the token using the JWT_SECRET
        const decoded = jwt.verify(token, process.env.JWT_SECRET_USER);
        console.log(decoded,'decodee')
        req.user = decoded; // Attach decoded user info to the request object
    } catch (error) {
        return res.status(401).json({
            status: "fail",
            message: "Invalid Token"
        });
    }
    return next();
};

module.exports=verifyUserToken;