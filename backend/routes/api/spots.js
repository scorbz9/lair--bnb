const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Spot, Image, Amenity } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const imgURLs = [
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641926344/gettyimages-517285546_eeqz4b.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641926324/MW-EQ389_amityv_20160629095319_ZH_lksvlg.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641943634/alkr3jflohsd1aujwipr.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641943690/oolkbfyzjp4a6cqy7ayr.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641943792/qp1wyh6bmgfbygidrjph.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641945061/zqnizjemsm0xhkpvgfrr.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641944257/tzlgn66u2r1ovdm7gdfj.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641945525/nldwmv6xgn7wvtxbyzpd.jpg'
];

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

router.get(
    '/',
    asyncHandler(async (req, res, next) => {
        const spots = await Spot.findAll({
            include: [Image, Amenity],
            order: [
                ['id', "ASC"]
            ]
        })
    })
);

const postSpotValidations = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Please provide an address.'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a description.'),
    check('pricePerNight')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a price.'),
    handleValidationErrors,
]

router.post(
    '/',
    postSpotValidations,
    asyncHandler(async (req, res, next) => {
        const {
            userId,
            address,
            description,
            pricePerNight,
            hairDryer,
            hotWater,
            hangers,
            bedLinens,
            iron,
            tv,
            heating,
            smokeAlarm,
            wifi,
            parking,
            kitchen
        } = req.body;

        const user = await User.findByPk(userId)

        // Gets random spooky house picture url from list
        const randomIndex = Math.floor(getRandomArbitrary(0, imgURLs.length));
        const imgURL = imgURLs[randomIndex];

        const newSpot = await Spot.create({
            userId,
            address,
            description,
            pricePerNight,
        });

        if (user.host === false) {
            await user.update({
                host: true
            });
        }

        await Image.create({
            spotId: newSpot.id,
            imgURL
        });

        await Amenity.create({
            spotId: newSpot.id,
            hairDryer,
            hotWater,
            hangers,
            bedLinens,
            iron,
            tv,
            heating,
            smokeAlarm,
            wifi,
            parking,
            kitchen
        });

        const newSpotInfo = await Spot.findByPk(newSpot.id, {
            include: [Image, Amenity]
        })

        return res.json(newSpotInfo)
    })
);

router.put(
    '/',
    asyncHandler(async (req, res, next) => {
        const {
            userId,
            address,
            description,
            pricePerNight,
            hairDryer,
            hotWater,
            hangers,
            bedLinens,
            iron,
            tv,
            heating,
            smokeAlarm,
            wifi,
            parking,
            kitchen,
            spotId
        } = req.body;

        const spot = await Spot.findByPk(spotId, {
            include: [Image, Amenity]
        })

        const amenity = await Amenity.findOne({
            where: { spotId }
        })

        await amenity.update(req.body)
        await spot.update(req.body);

        const updatedSpot = await Spot.findByPk(spotId, {
            include: [Image, Amenity]
        })

        res.json(updatedSpot);
    })
)

router.delete(
    '/',
    asyncHandler(async (req, res, next) => {
        console.log('I made it to the route')
        const { spotId } = req.body;

        const imageToDelete = await Image.findOne({
            where: { spotId }
        })
        const spotToDelete = await Spot.findByPk(spotId)
        const amenityToDelete = await Amenity.findOne({
            where: { spotId }
        });

        await amenityToDelete.destroy();
        await imageToDelete.destroy();
        await spotToDelete.destroy();

        res.json(spotId)

    })
)
module.exports = router;
