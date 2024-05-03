const express = require('express');
const multer = require('multer');
const axios = require('axios');

const app = express();
const port = 80; // измените порт на 80 или другой желаемый порт

const upload = multer();

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const image = req.file.buffer.toString('base64'); // Читаем содержимое изображения из буфера
    const myHeaders = {
      'Api-Key': '3cEkgcMbqFSOnPmMZrYi3JL8gXyxonx3UaAMqirfA2SgtAOXMP',
      'Content-Type': 'application/json',
    };
    const raw = JSON.stringify({
      images: [image],
      latitude: 0,
      longitude: 0,
      similar_images: true,
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      data: raw, // изменение: использование свойства "data" вместо "body"
      url: "https://plant.id/api/v3/identification", // изменение: использование "url" вместо параметра в fetch
    };
    const response = await axios(requestOptions); // изменение: использование Axios вместо fetch
    res.json(response.data);
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at port ${port}`); // изменение: вывод сообщения о запуске сервера на выбранном порту
});
