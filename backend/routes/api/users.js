const express = require('express');
const asyncHandler = require('express-async-handler');

const { setTokenCookie, requireAuth } = require('../../utils/auth');

const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { User, Spot, Image, Amenity, Booking } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

router.post(
    '/',
    validateSignup,
    asyncHandler(async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user,
        });
    }),
);

router.get(
    `/:userId/spots`,
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.userId, 10)
        const spots = await Spot.findAll({
            where: { userId },
            include: [Image, Amenity],
            order: [
                ['id', "ASC"]
            ]
        })

        res.json(spots)
    })
)

router.get(
    `/:userId/bookings`,
    asyncHandler(async (req, res) => {
        const userId = parseInt(req.params.userId, 10)
        const bookings = await Booking.findAll({
            where: { userId },
            order: [
                ['createdAt', 'ASC']
            ]
        })

        res.json(bookings)
    })
)

module.exports = router;
