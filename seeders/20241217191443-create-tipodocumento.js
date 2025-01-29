'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Insertar los tipos de documento en la tabla 'tipodocumento'
    await queryInterface.bulkInsert('tipodocumento', [
      {
        TipoDocumento: 'CC',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        TipoDocumento: 'PAS',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        TipoDocumento: 'CE',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        TipoDocumento: 'NIT',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Eliminar los tipos de documento de la tabla 'tipodocumento'
    await queryInterface.bulkDelete('tipodocumento', null, {});
  }
};
