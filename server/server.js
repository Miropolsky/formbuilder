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
app.post('/login', (req, res) => {
  console.log(req.body)
  if (!req.body.data) {
    return res.status(400).send('Нет передаваемых данных');
  }
  const { login, password } = req.body.data;
  // Проверяем, переданы ли login и password
  if (!login || !password) {
    return res.status(400).send('Необходимо указать login и password');
  }

  // Вывод логина в консоль
  console.log(`Login: ${login}`);

  // Отправляем ответ клиенту
  res.status(200).send('Логин принят');
});


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
