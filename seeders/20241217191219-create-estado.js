'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Insertar estados en la tabla 'estado'
    await queryInterface.bulkInsert('estado', [
      {
        Estado: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Estado: 'Inactivo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Estado: 'Operativo',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Estado: 'Suspendido',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Estado: 'Desconectado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Estado: 'Registrado',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        Estado: 'Retirado',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    // Eliminar los estados de la tabla 'estado'
    await queryInterface.bulkDelete('estado', null, {});
  }
};