const Mail = require('../models/mail');

const mailRouter = require('express').Router();

mailRouter.post('/', async (req, res) => {
    const {
        referenceId,
        department,
        receiptDate,
        category,
        sender,
        request,
        mailDate,
        time,
    } = req.body;

    const newMail = new Mail({
        referenceId,
        department,
        receiptDate,
        category,
        sender,
        request,
        mailDate,
        time,
    });

    const savedMail = await newMail.save();

    res.status(201).json(savedMail);
});

module.exports = mailRouter;
