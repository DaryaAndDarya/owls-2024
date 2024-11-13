'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Jane',
        email: 'jane@jane',
        password: await bcrypt.hash('123', 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    await queryInterface.bulkInsert(
      'Crafts',
      [
        {
          title: 'Сова из шишек',
          desc: 'Используйте шишки разного размера для создания тела, головы и крыльев совы.',
          url: 'https://balthazar.club/uploads/posts/2023-09/1694666759_balthazar-club-p-osennyaya-podelka-sova-krasivo-42.jpg',
          userId: 1,
        },
        {
          title: 'Поделка из коры',
          desc: 'Склейте кору разных цветов и форм, чтобы создать яркие и необычные предметы.',
          url: 'https://balthazar.club/uploads/posts/2023-09/thumbs/1694666713_balthazar-club-p-osennyaya-podelka-sova-krasivo-14.jpg',
          userId: 1,
        },
        {
          title: 'Стендап',
          desc: 'Соберите пиродные материалы разных размеров, чтобы создать забавную поделку.',
          url: 'https://balthazar.club/uploads/posts/2023-09/1694666718_balthazar-club-p-osennyaya-podelka-sova-krasivo-45.jpg',
          userId: 1,
        },
        {
          title: 'Птичка из веток',
          desc: 'Сложите веточки разных размеров и форм, чтобы создать изящную фигурку птички.',
          url: 'https://balthazar.club/uploads/posts/2023-09/thumbs/1694666756_balthazar-club-p-osennyaya-podelka-sova-krasivo-12.jpg',
          userId: 1,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
