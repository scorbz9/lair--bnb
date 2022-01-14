'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkInsert('Images', [
      {
        spotId: 1,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641925882/Amityville-Horror-House_imdsvf.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641926324/MW-EQ389_amityv_20160629095319_ZH_lksvlg.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641926344/gettyimages-517285546_eeqz4b.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 4,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641943634/alkr3jflohsd1aujwipr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 5,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641943690/oolkbfyzjp4a6cqy7ayr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 6,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641943792/qp1wyh6bmgfbygidrjph.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 7,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641945061/zqnizjemsm0xhkpvgfrr.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 8,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641926344/gettyimages-517285546_eeqz4b.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 9,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641944257/tzlgn66u2r1ovdm7gdfj.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 10,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1641945525/nldwmv6xgn7wvtxbyzpd.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 11,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124113/WebImage_doa55b.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 12,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124114/Eggener-Haunted-01-1020x617_mqgfnj.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 13,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124115/5a8df7c1391d9419008b46d5_x7jzhb.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 14,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124667/abandoned-haunted-house-refuge-of-spirits-moonlit-royalty-free-image-1633983690_ybl4oj.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 15,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124119/562fbe249dd7cc1b008c528d_wd1o50.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 16,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124123/abandoned-house-260nw-262755167_aqwojz.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 17,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124667/abandoned-haunted-house-refuge-of-spirits-moonlit-royalty-free-image-1633983690_ybl4oj.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 18,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124673/Scream_20Airbnb_2002_20-_20Exterior_20-_20Credit_20Helynn_20Ospina_mtrzes.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 19,
        imgURL: 'https://res.cloudinary.com/dzi47txgs/image/upload/v1642124680/1400948502820_joxtec.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
   return queryInterface.bulkDelete('Images', null, {});
  }
};
