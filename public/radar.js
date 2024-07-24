document.getElementById('wordInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem('word', 'radar');
    }
});

document.getElementById('labelInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem('label', 'radar');
    }
});

fetch("http://localhost:3000/api/words")
    .then((response) => response.json())
    .then((json) => renderList(json, 'word', 'radar'));

fetch("http://localhost:3000/api/labels")
    .then((response) => response.json())
    .then((json) => renderList(json, 'label', 'radar'));