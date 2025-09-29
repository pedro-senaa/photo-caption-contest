const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secret_key_for_deving'



const isAuthenticated = (req, res, next) => {
    // gets header. looks like 'bearer {token}'
    const authHeader = req.headers['authorization'];

    // error if header is wrong
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'No token provided or invalid formating!'
        })
    }

    // gets token from header
    const token = authHeader.split(' ')[1];
    // IN CASE token goes wrong (should not go wrong);
    if (!token) {
        return res.status(401).json({ message: 'Missing Token!' })
    }

    // verifys token
    try {
        // checks token (auto throws erros)
        const decoded = jwt.verify(token, JWT_SECRET);

        // stores it in req and goes to next function
        req.user = decoded
        next()
    } catch (err) {
        return res.status(500).json({
            error: 'Error authenticating: ', err
        })
    }
};


module.exports = { isAuthenticated };