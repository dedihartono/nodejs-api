'use strict';

/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password123', 10);

    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          password: hashedPassword,
          is_active: true,
          email_verified_at: new Date(),
          remember_token: 'token123',
          created_at: new Date(),
          updated_at: new Date(),
          deleted_at: null,
          created_by: null,
          updated_by: null,
          deleted_by: null,
        },
        // Add more seed data if needed
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    // Deleting all records from the users table
    return queryInterface.bulkDelete('users', null, {});
  },
};
