const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');

const app = express();
const port = 3000;

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const image = fs.readFileSync(req.file.path).toString('base64');
    const myHeaders = {
      'Api-Key': '3cEkgcMbqFSOnPmMZrYi3JL8gXyxonx3UaAMqirfA2SgtAOXMP', // Замените на свой ключ API от Plant.id
      'Content-Type': 'application/json',
    };
    const raw = JSON.stringify({
      images: [image],
      latitude: 0, // Ваша широта
      longitude: 0, // Ваша долгота
      similar_images: true,
    });
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    const response = await fetch("https://plant.id/api/v3/identification", requestOptions);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
