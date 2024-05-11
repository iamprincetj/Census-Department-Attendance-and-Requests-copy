const UserAttendance = require('../models/user_attendance')
const ExcelJS = require('exceljs')
const json2csv = require('json2csv').parse

const userRouter = require('express').Router()


userRouter.get('/download-excel', async (request, response) => {
    const user = await UserAttendance.find({})

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('UserAttendance')

    user.forEach((item, index) => {
        let row = index + 2
        const { _id, __v, ...rest } = item._doc
        let cleanData = rest

        Object.keys(cleanData).forEach((key) => {
            let col = Object.keys(cleanData).indexOf(key) + 1
            if (index === 0) {
                worksheet.getCell(1, col).value = key
            }
            worksheet.getCell(row, col).value = cleanData[key]
        })
    })

    await workbook.xlsx.writeFile('UserAttendance.xlsx')

    response.download('UserAttendance.xlsx')
})

userRouter.get('/download-csv', async (request, response) => {
    const user = await UserAttendance.find({})

    const csv = json2csv(user.map(item => {
        let { _id, __v, ...rest } = item._doc
        return rest
    }))

    response.setHeader('Content-disposition', 'attachment; filename=userAttendance.csv')
    response.set('Content-Type', 'text/csv')
    response.status(200).send(csv)
})

userRouter.post('/', async (request, response) => {
    const { fullname, time, date, posting, long, lat } = request.body

    const dateTransform = new Date(date+ ' ' +time)

    const transformedDate = dateTransform.toDateString()
    const transformedTime = dateTransform.toTimeString()

    const user = new UserAttendance({
        fullname,
        time: transformedTime,
        date: transformedDate,
        posting,
        long,
        lat
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

userRouter.get('/:name', async (request, response) => {
    const name = request.params.name
    const user = await UserAttendance.find({ name })

    if (user) {
        response.json(user)
    }else {
        response.json({
            error: 'No Sure UserAttendance'
        })
    }
})

module.exports = userRouter