const UserAttendance = require('../models/user_attendance');
const ExcelJS = require('exceljs');
const json2csv = require('json2csv').parse;
const fs = require('fs');
const path = require('path');

const userRouter = require('express').Router();

userRouter.get('/', async (request, response) => {
    const users = await UserAttendance.find({});

    users.forEach((user, idx) => {
        const row = idx + 2;
        const { _id, __v, ...rest } = user._doc;
        let cleanData = rest;
        Object.keys(cleanData).forEach((key) => {
            let col = Object.keys(cleanData).indexOf(key) + 1;
        });
    });

    response.json(users);
});

userRouter.get('/download', async (request, response) => {
    const { month, format } = request.query;
    const users = await UserAttendance.find({});

    const attendanceByMonth = users.filter(
        (item) => new Date(item.date).getMonth() === Number(month)
    );

    if (attendanceByMonth.length > 0) {
        if (format === 'csv') {
            const csv = json2csv(
                attendanceByMonth.map((item) => {
                    let { _id, __v, ...rest } = item._doc;
                    return rest;
                })
            );
            const filePath = path.join(__dirname, 'userAttendance.csv');
            fs.writeFileSync(filePath, csv);
            response.setHeader(
                'Content-disposition',
                'attachment; filename=userAttendance.csv'
            );
            response.set('Content-Type', 'text/csv');
            response.status(200).download(filePath);
        } else if (format === 'excel') {
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('UserAttendance');

            users.forEach((item, index) => {
                let row = index + 2;
                const { _id, __v, ...cleanData } = item._doc;

                Object.keys(cleanData).forEach((key) => {
                    let col = Object.keys(cleanData).indexOf(key) + 1;
                    if (index === 0) {
                        worksheet.getCell(1, col).value = key;
                    }
                    worksheet.getCell(row, col).value = cleanData[key];
                });
            });

            await workbook.xlsx.writeFile('UserAttendance.xlsx');

            response.download('UserAttendance.xlsx');
        }
    } else {
        response.status(404).json({
            error: 'No attendance yet',
        });
    }

    /**
     * 
     *     const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('UserAttendance');

    user.forEach((item, index) => {
        let row = index + 2;
        const { _id, __v, ...rest } = item._doc;
        let cleanData = rest;

        Object.keys(cleanData).forEach((key) => {
            let col = Object.keys(cleanData).indexOf(key) + 1;
            if (index === 0) {
                worksheet.getCell(1, col).value = key;
            }
            worksheet.getCell(row, col).value = cleanData[key];
        });
    });

    await workbook.xlsx.writeFile('UserAttendance.xlsx');

    response.download('UserAttendance.xlsx');
     */
});

userRouter.post('/', async (request, response) => {
    const { fullname, time, date, posting, long, lat } = request.body;
    const dateTransform = new Date(date + ' ' + time);

    try {
        const user = new UserAttendance({
            fullname,
            date: dateTransform.toDateString(),
            time: dateTransform.toTimeString(),
            posting,
            long,
            lat,
        });

        const savedUser = await user.save();
        response.status(201).json(savedUser);
    } catch (error) {
        if (error.name === 'ValidationError') {
            response.status(400).json({ error: error.message });
        }
    }
});

userRouter.get('/:name', async (request, response) => {
    const name = request.params.name;
    const user = await UserAttendance.find({ name });

    if (user) {
        response.json(user);
    } else {
        response.json({
            error: 'No Sure UserAttendance',
        });
    }
});

module.exports = userRouter;
