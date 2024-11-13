const craftRouter = require('express').Router();
const { Craft, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const upload = require('../middlewares/multer');
const fs = require('fs/promises');
const sharp = require('sharp');

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
  .post(verifyAccessToken, upload.single('file'), async (req, res) => {
    try {
      const { title, desc} = req.body;
      if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
      }
      const name = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      await fs.writeFile(`./public/img/${name}`, outputBuffer);

      const newCraft = await Craft.create({
        title,
        desc,
        url: name,
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
