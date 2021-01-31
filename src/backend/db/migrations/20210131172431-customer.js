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
        queryInterface.createTable('customer', {
          id: {
             primaryKey: true,
             autoIncrement: true,
             allowNull: false,
             type: Sequelize.INTEGER,
          },
          identificationNumber: {
             allowNull: false,
             unique: true,
             type: Sequelize.STRING,
          },
          name: {
            unique: false,
            allowNull: false,
            type: Sequelize.STRING,
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
        await queryInterface.dropTable('customer', { transaction });
      });
   },
};
