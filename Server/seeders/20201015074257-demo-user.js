"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        fullName: "Admin",
        email: "admin@root.com",
        password:
          "$2b$10$SBHuj6DYqiQB/q7LkPi7xep2rtvPE.Q5mW9G0tgOypudRg7nY9BqO",
        phone: "08123456789",
        address: "Jl Pegangsaan Timur no 56 Jakarta",
        gender: "Male",
        picture: null,
        role: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        fullName: "User",
        email: "user@root.com",
        password:
          "$2b$10$l8ThXlcy63WQnCy1YI2LMOVyfOKdai.IvCd/pHkj7B/bEdnZaPczi",
        phone: "08223456789",
        address: "Jl Dipatiukur no 112 - 116 Bandung",
        gender: "Female",
        picture: null,
        role: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
