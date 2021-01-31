// @ts-check
('use strict');

module.exports = {
   /**
    * @param {import('sequelize').QueryInterface} queryInterface
    * @param {any} Sequelize
    * @returns
    */
   up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      queryInterface.createTable('agreement', {
        id: {
           primaryKey: true,
           autoIncrement: true,
           allowNull: false,
           type: Sequelize.INTEGER,
        },
        type: {
           allowNull: false,
           type: Sequelize.INTEGER,
        },
        customerId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'customer',
            key: 'id',
          },
        },
        start: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        end: {
          allowNull: true,
          type: Sequelize.DATE,
        },
        createdAt: {
           allowNull: false,
           type: Sequelize.DATE,
        },
        updatedAt: {
           allowNull: false,
           type: Sequelize.DATE,
        },
     });
    });
   },

   /**
    * @param {import('sequelize').QueryInterface} queryInterface
    * @param {any} Sequelize
    * @returns
    */
   down: async (queryInterface, Sequelize) => {
      await queryInterface.sequelize.transaction(async (transaction) => {
        await queryInterface.dropTable('agreement', { transaction });
      });
   },
};
