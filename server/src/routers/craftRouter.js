const craftRouter = require('express').Router();
const { Craft, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

craftRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const craftArr = await Craft.findAll({
        include: [{ model: User, attributes: ['name', 'id'] }],
      });
      res.json(craftArr);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .post(verifyAccessToken, async (req, res) => {
    try {
      const { title, desc, url } = req.body;
      const newCraft = await Craft.create({
        title,
        desc,
        url,
        userId: res.locals.user.id,
      });
      // если добавление на странице с изделиями
      // newCraft.User = res.locals.user

      res.json(newCraft);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });
craftRouter
  .route('/:id')
  .put(verifyAccessToken, async (req, res) => {
    try {
      const { id } = req.params;
      const { title, desc, url } = req.body;
      await Craft.update(
        { title, desc, url },
        { where: { id, userId: res.locals.user.id } },
      );
      const newCraft = await Craft.findByPk(id);
      res.json(newCraft);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .delete(async (req, res) => {
    try {
      const { id } = req.params;
      await Craft.destroy({ where: { id } });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .get(async (req, res) => {
    try {
      const { id } = req.params;
      const oneCraft = await Craft.findOne({ where: { id } });
      res.json(oneCraft);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });
module.exports = craftRouter;
