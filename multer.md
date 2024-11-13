СЕРВЕР
1. Подготовить БД (поле в модели и миграции с типом данных `string`)
2. Установить необходимые пакеты: `npm i multer sharp`
3. Создать мидлвару multer.js с конфигурацией для загрузки и хранения файла:
`const multer = require('multer');

const upload = multer({
  storage: multer.memoryStorage(), 
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.includes('image')) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});

module.exports = upload;`

4. Импортировать fs/promises, sharp, multer.js в роут, в котором будет происходить добавление файла
5. В `post` запросе на роут подключить `upload.single('file')`
6. Написать проверку на наличие поля `file` в `request`
7. Создать переменную name, которая будет использована в качестве имени загруженного файла
8. С помощью библиотеки`sharp` создать буфер на основе загруженного файла: <const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();>
9. Создать папки public/img на сервере и подключить в app.js: `app.use(express.static('public'))`
10. Записать буфер в папку public/img: <await fs.writeFile(`./public/img/${name}`, outputBuffer);>
11. Создать запись в БД

КЛИЕНТ
1. На форме добавления создать инпут с аттрибутами: `name="file", type="file"`
2. На submitHandler создать новый объект new FormData() и добавить поля с формочки помощью метода append()
3. Отправить созданный объект в post запросе
4. Для отображения загруженного файла по его имени на форме написать: <src={`http://localhost:3000/img/${name}`} >
