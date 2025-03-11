"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const users = [];
        for (let i = 0; i < 10; i++) {
            users.push({
                nombre: faker.person.fullName(),
                email: faker.internet.email(),
                password: "1234",
                rol: faker.helpers.arrayElement(["user"]),
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        await queryInterface.bulkInsert("Usuarios", users, {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Usuarios", null, {});
    },
};
