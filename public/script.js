// Обновленный скрипт script.js

document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', event.target.image.files[0]);

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData,
        });

        // Проверяем статус ответа сервера
        if (!response.ok) {
            // Если статус не 200 (успех), выводим сообщение об ошибке
            throw new Error(`Server responded with ${response.status}: ${response.statusText}`);
        }

        // Ответ сервера ожидается в формате JSON
        const data = await response.json();
        console.log(data);

        // Очищаем содержимое div-элемента перед выводом новых результатов
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        // Проверяем, есть ли результаты
        if (data.result && data.result.classification && data.result.classification.suggestions) {
            const suggestions = data.result.classification.suggestions;

            // Проходимся по каждому предложению и выводим информацию
            suggestions.forEach((suggestion, index) => {
                // Создаем элемент для изображения
                const img = document.createElement('img');
                img.src = suggestion.similar_images[0].url_small;
                img.alt = suggestion.name;
                resultDiv.appendChild(img);

                // Создаем элемент для названия растения и вероятности
                const plantInfo = document.createElement('p');
                plantInfo.textContent = `${index + 1}. ${suggestion.name} (${(suggestion.probability * 100).toFixed(2)}%)`;
                resultDiv.appendChild(plantInfo);
            });
        } else {
            // Если результатов нет, выводим сообщение
            resultDiv.textContent = 'No plant identification result found.';
        }
    } catch (error) {
        console.error('Error:', error);
        // В случае ошибки выводим сообщение об ошибке на странице
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
    }
});
