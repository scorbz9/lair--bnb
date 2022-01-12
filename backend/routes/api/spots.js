const express = require('express');
const asyncHandler = require('express-async-handler');
const { User, Spot, Image, Amenity } = require('../../db/models');

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

router.post(
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

        const newImage = await Image.create({
            spotId: newSpot.id,
            imgURL
        });

        const newAmenity = await Amenity.create({
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

        return res.json(newSpot)
    })
);

module.exports = router;
