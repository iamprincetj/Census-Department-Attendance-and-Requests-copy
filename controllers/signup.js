const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

const signupRouter = require('express').Router();

signupRouter.post('/', async (req, res) => {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ username, passwordHash });
    await newAdmin.save();
    res.json({ message: 'Admin created successfully' });
});

module.exports = signupRouter;
