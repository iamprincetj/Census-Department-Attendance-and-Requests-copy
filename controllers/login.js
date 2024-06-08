const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/admin');
const UserToken = require('../models/userToken');

const loginRouter = require('express').Router();

loginRouter.post('/', async (req, res) => {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });

    if (admin) {
        if (!admin.passwordChanged) {
            if (username === 'admin' && password === 'admin') {
                const userForToken = {
                    id: admin._id.toString(),
                    username: admin.username,
                };
                const token = jwt.sign(userForToken, process.env.SECRET);
                const tokenObject = { token, username: userForToken.username };

                const newToken = new UserToken(tokenObject);
                await newToken.save();
                res.json(tokenObject);
            }
        } else {
            const passwordCorrect = bcrypt.compare(password, admin.password);

            if (!(admin && passwordCorrect)) {
                return res
                    .status(401)
                    .json({ error: 'invalid username or password' });
            }

            const userForToken = {
                id: admin._id.toString(),
                username: admin.username,
            };
            const token = jwt.sign(userForToken, process.env.SECRET);
            const tokenObject = { token, username: userForToken.username };

            const newToken = new UserToken(tokenObject);
            await newToken.save();
            res.json(tokenObject);
        }
    } else {
        return res.status(401).json({ error: 'invalid username or password' });
    }
});

loginRouter.post('/change', async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ error: 'token missing' });
    }

    let token = '';
    if (auth.startsWith('Bearer ')) {
        token = auth.substring(7);
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'passwords do not match' });
    }
    const admin = await Admin.findById(decodedToken.id);
    const passwordHash = await bcrypt.hash(confirmPassword, 10);

    admin.username = username;
    admin.password = passwordHash;
    admin.passwordChanged = true;
    await admin.save();
    res.status(200).end();
});

loginRouter.post('/logout', async (req, res) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).json({ error: 'token missing' });
    }

    let token = '';
    if (auth.startsWith('Bearer ')) {
        token = auth.substring(7);
    }
    const decodedToken = jwt.verify(token, process.env.SECRET);
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }

    await UserToken.findOneAndDelete({ token });
    res.status(200).end();
});

loginRouter.get('/token', async (req, res) => {
    const userToken = await UserToken.find({});
    if (!userToken) {
        return res.status(401).json({ error: 'token missing' });
    }
    res.json(userToken[0]);
});

module.exports = loginRouter;
