'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [{
        name: 'Ashish Jain',
        email: 'jainashish419@gmail.com',
        education: "BTech Computer Science",
        skills: JSON.stringify(
          ["Javascript",
            "Node.js", 
            "React", 
            "MySQL",
            "MongoDB", 
            "JWT", 
            "Redux",
            "Express.JS", 
            "Bootstrap"
          ]
        ),
        projects: JSON.stringify([
          {
            title:"Proshop Ecommerce-webapp",
            description: "An ecommerce platform  to buy electronic products",
            links: "https://proshop-4hq2.onrender.com/"
          }
        ]),
        work : JSON.stringify([]),
        
        links: JSON.stringify({
          github: "https://github.com/asj0000",
          linkedin: "https://www.linkedin.com/in/ashish-jain12/",
          portfolio: "https://jainashish-portfolio.netlify.app/"
        }),
        createdAt: new Date(),
        updatedAt: new Date()
      }])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
