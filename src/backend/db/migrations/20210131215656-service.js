'use strict';

module.exports = {
  /**
    * @param {import('sequelize').QueryInterface} queryInterface
    * @param {any} Sequelize
    * @returns
    */
   up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.transaction(async (transaction) => {
      queryInterface.createTable('service', {
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
        agreementId: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'agreement',
            key: 'id',
          },
        },
        fee: {
          allowNull: false,
          type: Sequelize.DECIMAL,
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
      await queryInterface.dropTable('service', { transaction });
    });
 },
};
