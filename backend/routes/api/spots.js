const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Spot, Image, Amenity } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { singlePublicFileUpload, singleMulterUpload } = require('../../awsS3.js')

const router = express.Router();

const imgURLs = [
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641926344/gettyimages-517285546_eeqz4b.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641926324/MW-EQ389_amityv_20160629095319_ZH_lksvlg.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641943634/alkr3jflohsd1aujwipr.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641943690/oolkbfyzjp4a6cqy7ayr.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641943792/qp1wyh6bmgfbygidrjph.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641945061/zqnizjemsm0xhkpvgfrr.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641944257/tzlgn66u2r1ovdm7gdfj.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1641945525/nldwmv6xgn7wvtxbyzpd.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124113/WebImage_doa55b.png',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124114/Eggener-Haunted-01-1020x617_mqgfnj.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124115/5a8df7c1391d9419008b46d5_x7jzhb.png',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124667/abandoned-haunted-house-refuge-of-spirits-moonlit-royalty-free-image-1633983690_ybl4oj.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124119/562fbe249dd7cc1b008c528d_wd1o50.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124123/abandoned-house-260nw-262755167_aqwojz.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124667/abandoned-haunted-house-refuge-of-spirits-moonlit-royalty-free-image-1633983690_ybl4oj.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124673/Scream_20Airbnb_2002_20-_20Exterior_20-_20Credit_20Helynn_20Ospina_mtrzes.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124680/1400948502820_joxtec.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124688/hohh-105-unit-03033r_dhny18.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124697/04spookyhousesgallery_guulie.jpg',
    'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124707/screen-shot-2018-08-03-at-9-58-29-am-1533305203.png_hdo2jv.png',
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

        res.json(spots)
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
    singleMulterUpload("image"),
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
        let imgURL = imgURLs[randomIndex]
        if (req.file !== undefined) {
            imgURL = await singlePublicFileUpload(req.file);
        }

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
    singleMulterUpload("image"),
    postSpotValidations,
    asyncHandler(async (req, res, next) => {
        const { spotId } = req.body;


        const spot = await Spot.findByPk(spotId, {
            include: [Image, Amenity]
        })

        const amenity = await Amenity.findOne({
            where: { spotId }
        })

        const imageToUpdate = await Image.findOne({
            where: { spotId }
        })

        let imgURL;
        if (req.file !== undefined) {
            imgURL = await singlePublicFileUpload(req.file);
        }

        await amenity.update(req.body)
        await spot.update(req.body);
        await imageToUpdate.update({ imgURL })

        const updatedSpot = await Spot.findByPk(spotId, {
            include: [Image, Amenity]
        })

        res.json(updatedSpot);
    })
)

router.delete(
    '/',
    asyncHandler(async (req, res, next) => {
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
