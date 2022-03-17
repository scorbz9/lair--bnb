'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert('Spots', [
      { id: 1,
        userId: 1,
        description: "The home — its original address was 112 Ocean Ave. but was changed to 108 to deter tourists — was purchased by George and Kathy Lutz one year after the murders. But they ditched the property after only one month due to reported paranormal activity, which inspired a 1977 book and 1979 movie.",
        address: "108 Ocean Ave, Amityville, NY 11701",
        pricePerNight: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 2,
        userId: 1,
        description: "The is where Lizzie Borden and her family lived. It is notable for being the location of the notorious 1892 unsolved double murder of Andrew and Abby Borden. It is located on 230 Second Street in the city of Fall River, Massachusetts. ",
        address: "230 2nd St, Fall River, MA 02721",
        pricePerNight: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 3,
        userId: 1,
        description: "Located down one of the most picturesque blocks in New York City stands a building with a notoriously dark history. Nicknamed the “House of Death,” 14 West 10th Street is supposedly haunted by 22 ghosts, the most famous of which is Mark Twain, who resided there from 1900-1901.",
        address: "14 W 10th St, New York, NY 10011",
        pricePerNight: 15,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { id: 4,
        userId: 1,
        description: "At one of the most haunted houses in America, the bad energy allegedly stems from a botched appendectomy—the girl who haunts the house died during a house call at the turn of the century. In the 1990s, a family who lived in the Sallie House documented their experience on the TV show Sightings, which spoke of flying objects, frequent apparitions, and a mix of scratching, gouging, and shoving (all mainly directed at the male owner).",
        address: "508 N 2nd St, Atchison, KS 66002",
        pricePerNight: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 5,
        userId: 1,
        description: `The "Unsinkable Molly Brown" was one of the only people to survive the Titanic, but she wasn't entirely unstoppable: she died in New York in 1932. It's said that Brown (along with her husband and mother) still haunts the prized Victorian home, now a museum, where she spent much of her adult life. Visitors say they’ve seen apparitions in the dining room, rearranged furniture, and similarly strange occurrences in the former room of Brown's child, Catherine, who died at a young age.`,
        address: "1340 Pennsylvania St, Denver, CO 80203",
        pricePerNight: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 6,
        userId: 1,
        description: "It's the age-old tale of neighbors at war: a woman named Kate Batts believed her neighbor, John Bell, cheated her out of some land. Lying on her deathbed in the early 19th century, she swore she would haunt him forever. The result was mayhem for the Bell family, which said they experienced physical attacks and heard chains dragged across floors and noises in the walls.",
        address: "430 Keysburg Rd, Adams, TN 37010",
        pricePerNight: 30,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 7,
        userId: 1,
        description: "When the Snedeker family lived here in the 1980s, the drama they experienced in this haunted house (and former funeral home) was so crazy it ended up inspiring a popular horror flick called The Haunting in Connecticut. During a two-year span, the Snedeker parents claimed to have been physically assaulted and sodomized by demonic spirits, and said their son Philip was often visited by a creepy man with long black hair.",
        address: "208 Meriden Ave, Southington, CT 06489",
        pricePerNight: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 8,
        userId: 1,
        description: `All the beer in the world won't lead to happiness. So is the case with the Lemp family, purveyors of Lemp Brewing Company, a stalwart in St. Louis before prohibition hit. Four members of the family killed themselves between 1904 and 1949, three of them inside the 33-room Victorian mansion where they allegedly still reside and haunt guests. It has since been turned into a restaurant and inn where you can spend the night and even partake in a ghost tour—just go a little easy on the beer during your stay, okay?`,
        address: "3322 DeMenil Place, St. Louis, MO 63118",
        pricePerNight: 10,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 9,
        userId: 1,
        description: `This brick mansion, built in 1784 for prominent merchant Joshua Ward in 1784, is the exact site where Sherriff George Corwin (a major figure in the Salem Witch Trials) lived, died, and was buried in 1697. Corwin was known as "the strangler" for the 19 men and women executed for witchcraft under his watch. He is said to still creep around the grounds, with some visitors claiming they have been "choked" by him (old habits die hard, after all).`,
        address: "148 Washington St, Salem, MA 01970",
        pricePerNight: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { id: 10,
        userId: 1,
        description: `A total of 11 reported spirits (from passengers of a shipwrecked ferry to a former slave) are known to haunt the grounds of this Southern plantation. Of course, the most prominent ghost is said to be Grace Sherwood, a woman who was accused of witchcraft in the 1700s and was tried by ducking. These days, when you visit the historic house-museum to admire the Federal-style architecture, listen carefully: you might hear Grace yelling at Tobias, her dead dog.`,
        address: "4136 Cheswick Ln, Virginia Beach, VA 23455",
        pricePerNight: 23,
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
   return queryInterface.bulkDelete('Spots', null, {});
  }
};
