const verifyToken = (req, res, next) => {
    const token = req.authorization;

    if (!token) {
        return res.status(401).json({ error: 'Token is missing' });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET);

    if (!decodedToken.id) {
        return res.status(401).json({ error: 'Token is invalid' });
    }

    req.username = decodedToken.username;

    next();
};

module.exports = verifyToken;
