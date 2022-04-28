const express = require('express')
const asyncHandler = require('express-async-handler');
const { Booking, Spot } = require('../../db/models')
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get(
    `/`,
    asyncHandler(async (req, res) => {
        const bookings = await Booking.findAll({
            include: [{ all: true, nested: true }],
            order: [
                ['createdAt', 'ASC'],
            ]
        })

        return res.json(bookings)
    })
)

const postBookingValidations = [
    check('dateRange')
        .exists({ checkFalsy: true })
        .withMessage('Please select a date range.'),
    handleValidationErrors
]

router.post(
    `/`,
    postBookingValidations,
    asyncHandler(async (req, res) => {
        const { dateRange, spotId, userId } = req.body;

        const newBooking = await Booking.create({
            startDate: dateRange[0],
            endDate: dateRange[1],
            userId,
            spotId
        })

        const bookings = await Booking.findAll({
            include: [{ all: true, nested: true }],
            order: [
                ['createdAt', 'ASC'],
            ]
        })

        return res.json(bookings)

    })
)

router.put(
    `/`,
    postBookingValidations,
    asyncHandler(async (req, res) => {
        const { dateRange, spotId, userId, bookingId } = req.body;

        const bookingToUpdate = await Booking.findOne({
            where: { bookingId },
            include: [{ all: true, nested: true }],
        })

        await bookingToUpdate.update({
            startDate: dateRange[0],
            endDate: dateRange[1],
        })

        const bookings = await Booking.findAll({
            include: [{ all: true, nested: true }],
            order: [
                ['createdAt', 'ASC'],
            ]
        })

        return res.json(bookings)

    })
)

router.delete(
    `/`,
    asyncHandler(async (req, res) => {
        const { dateRange, spotId, userId, bookingId } = req.body;

        const bookingToDelete = await Booking.findOne({
            where: { bookingId },
            include: [{ all: true, nested: true }],
        })

        await bookingToDelete.destroy();

        const bookings = await Booking.findAll({
            include: [{ all: true, nested: true }],
            order: [
                ['createdAt', 'ASC'],
            ]
        })

        return res.json(bookings)

    })
)

module.exports = router;
