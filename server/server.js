const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

app.use(cors({
  origin: 'http://localhost:5173',
}));

// Middleware для работы с JSON
app.use(express.json());

// Маршрут для получения всех форм
app.get('/forms', (req, res) => {
  fs.readFile('forms.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка при чтении файла');
    }
    res.json(JSON.parse(data));
  });
});

// Маршрут для добавления новой формы
app.post('/addForm', (req, res) => {
  const newForm = req.body;
  newForm.id = uuidv4();
  // Чтение существующих форм
  fs.readFile('forms.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка при чтении файла');
    }
    const forms = JSON.parse(data);
    forms.push(newForm);

    // Запись обновленного массива в файл
    fs.writeFile('forms.json', JSON.stringify(forms), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Ошибка при записи файла');
      }
      res.status(201).send('Форма добавлена');
    });
  });
});

// Маршрут для удаления формы по ID
app.delete('/deleteForm/:id', (req, res) => {
  const formId = req.params.id;

  fs.readFile('forms.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка при чтении файла');
    }
    let forms = JSON.parse(data);
    forms = forms.filter((form) => form.id !== formId);

    // Запись обновленного массива в файл
    fs.writeFile('forms.json', JSON.stringify(forms), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Ошибка при записи файла');
      }
      res.status(200).send('Форма удалена');
    });
  });
});

// Маршрут для редактирования формы по ID
app.put('/editForm/:id', (req, res) => {
  const formId = req.params.id;
  const updatedForm = req.body; // Новые данные формы

  // Чтение существующих форм
  fs.readFile('forms.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Ошибка при чтении файла');
    }
    let forms = JSON.parse(data);

    // Найти индекс формы по ID
    const formIndex = forms.findIndex((form) => form.id === formId);
    if (formIndex === -1) {
      return res.status(404).send('Форма не найдена');
    }

    // Перезаписать данные формы
    forms[formIndex] = { ...forms[formIndex], ...updatedForm };

    // Запись обновленного массива в файл
    fs.writeFile('forms.json', JSON.stringify(forms), 'utf8', (err) => {
      if (err) {
        return res.status(500).send('Ошибка при записи файла');
      }
      res.status(200).send('Форма обновлена');
    });
  });
});


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
