document.getElementById('wordInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addItem('word', 'scatter');
    }
});

fetch("http://localhost:3000/api/words")
    .then((response) => response.json())
    .then((json) => renderList(json, 'word', 'scatter'));