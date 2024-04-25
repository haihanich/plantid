document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', event.target.image.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        console.log(data);
        document.getElementById('result').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('identifyButton').addEventListener('click', function () {
    // Действия при нажатии на кнопку "Identify Plant"
    // Ваш код для обработки результата идентификации здесь
});
