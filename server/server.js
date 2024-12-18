import express, { json } from 'express';
import { readFile, writeFile } from 'fs';
import { promisify } from 'util';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';

const app = express();
const PORT = 5000;

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);

app.use(cors({
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,DELETE',
}));

// Middleware для работы с JSON
app.use(json());

// Маршрут для получения всех форм
app.get('/forms', async (req, res) => {
  try {
    const data = await readFileAsync('./server/forms.json', 'utf8');
    const forms = JSON.parse(data);
    res.json(forms);
  } catch (err) {
    console.error('Ошибка при чтении файла:', err);
    res.status(500).send('Ошибка при чтении файла');
  }
});

// Маршрут для добавления новой формы
app.post('/addForm', async (req, res) => {
  const newForm = req.body;
  newForm.id = uuidv4();

  try {
    const data = await readFileAsync('./server/forms.json', 'utf8');
    const forms = JSON.parse(data);
    forms.push(newForm);

    await writeFileAsync('./server/forms.json', JSON.stringify(forms), 'utf8');
    res.status(201).send('Форма добавлена');
  } catch (err) {
    console.error('Ошибка при записи файла:', err);
    res.status(500).send('Ошибка при записи файла');
  }
});

// Маршрут для удаления формы по ID
app.delete('/deleteForm/:id', async (req, res) => {
  const formId = req.params.id;

  try {
    const data = await readFileAsync('./server/forms.json', 'utf8');
    let forms = JSON.parse(data);

    forms = forms.filter((form) => form.id !== formId);
    await writeFileAsync('./server/forms.json', JSON.stringify(forms), 'utf8');
    res.status(200).send('Форма удалена');
  } catch (err) {
    console.error('Ошибка при записи файла:', err);
    res.status(500).send('Ошибка при записи файла');
  }
});

// Маршрут для редактирования формы по ID
app.put('/editForm/:id', async (req, res) => {
  const formId = req.params.id;
  const updatedForm = req.body;

  try {
    const data = await readFileAsync('./server/forms.json', 'utf8');
    let forms = JSON.parse(data);

    const formIndex = forms.findIndex((form) => form.id === formId);
    if (formIndex === -1) {
      return res.status(404).send('Форма не найдена');
    }

    forms[formIndex] = { ...forms[formIndex], ...updatedForm };
    await writeFileAsync('./server/forms.json', JSON.stringify(forms), 'utf8');
    res.status(200).send('Форма обновлена');
  } catch (err) {
    console.error('Ошибка при записи файла:', err);
    res.status(500).send('Ошибка при записи файла');
  }
});


// Маршрут для логина
// app.post('/login', (req, res) => {
//   console.log(req.body)
//   if (!req.body.data) {
//     return res.status(400).send('Нет передаваемых данных');
//   }
//   const { login, password } = req.body.data;
//   // Проверяем, переданы ли login и password
//   if (!login || !password) {
//     return res.status(400).send('Необходимо указать login и password');
//   }

//   // Вывод логина в консоль
//   console.log(`Login: ${login}`);

//   // Отправляем ответ клиенту
//   res.status(200).send('Логин принят');
// });

// Маршрут для сохранения произвольных данных
app.post('/saveData', async (req, res) => {
  const formData = req.body;
  formData.id = uuidv4();
  console.log(formData)
  try {
    // Читаем текущие данные
    const data = await readFileAsync('./server/ValueSaveForm.json', 'utf8');
    const savedData = JSON.parse(data);

    // Добавляем новые данные
    if (savedData) {
      savedData.push(formData);
    }


    // Записываем обновленные данные в файл
    await writeFileAsync('./server/ValueSaveForm.json', JSON.stringify(savedData), 'utf8');
    res.status(201).send('Данные сохранены');
  } catch (err) {
    console.error('Ошибка при записи файла:', err);
    res.status(500).send('Ошибка при записи файла');
  }
});

// Маршрут для получения сохраненных данных
app.get('/getData', async (req, res) => {
  try {
    const data = await readFileAsync('./server/ValueSaveForm.json', 'utf8');
    const savedData = JSON.parse(data);
    res.json(savedData);
  } catch (err) {
    console.error('Ошибка при чтении файла:', err);
    res.status(500).send('Ошибка при чтении файла');
  }
});

// Маршрут для добавления нового изображения
app.post('/addImage', async (req, res) => {
  const { imageBase64 } = req.body; // Принимаем изображение в формате base64
  const newImage = {
    id: uuidv4(),
    image: imageBase64,
  };

  try {
    const data = await readFileAsync('./server/imgs.json', 'utf8');
    let images = JSON.parse(data);

    images.push(newImage); // Добавляем новое изображение в массив

    await writeFileAsync('./server/imgs.json', JSON.stringify(images), 'utf8');
    res.status(201).send({ id: newImage.id, message: 'Изображение сохранено' });
  } catch (err) {
    console.error('Ошибка при записи файла:', err);
    res.status(500).send('Ошибка при записи файла');
  }
});

// Маршрут для получения изображения по ID
app.get('/getImage/:id', async (req, res) => {
  const imageId = req.params.id;

  try {
    const data = await readFileAsync('./server/imgs.json', 'utf8');
    const images = JSON.parse(data);

    const image = images.find((img) => img.id === imageId);

    if (!image) {
      return res.status(404).send('Изображение не найдено');
    }

    res.status(200).json({ image: image.image });
  } catch (err) {
    console.error('Ошибка при чтении файла:', err);
    res.status(500).send('Ошибка при чтении файла');
  }
});


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
