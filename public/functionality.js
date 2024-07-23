function reloadGraph(datapoints, labels){
  chart.data = {
      datasets: datapoints,
  };
  chart.update();
}

function addText() {
    const input = document.getElementById('textInput');
    const taskList = document.getElementById('taskList');

    if (input.value.trim() === '') {
        alert('Please enter some text!');
        return;
    }

    fetch("http://localhost:3000/api/add-word", {
            method: "POST",
            body: JSON.stringify({
                word: input.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => renderList(json));


    input.value = '';
}

function removeText(item) {
    const taskList = document.getElementById('taskList');
    fetch("http://localhost:3000/api/del-word", {
            method: "POST",
            body: JSON.stringify({
                word: item
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => renderList(json));
}

function renderList(list) {
    const taskList = document.getElementById('taskList');
    taskList.replaceChildren()
    if(list.length > 0){      
      fetch("http://localhost:3000/api/generate-plot")
            .then((response) => response.json())
            .then((json) => reloadGraph(json));
    }
    list.forEach((item) => {

        // create delete button
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '✖';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            removeText(item)
        };

        //create list item
        const newLi = document.createElement('li');
        const taskText = document.createElement('span');
        taskText.textContent = item;
        taskText.className = 'task-text';

        // append new elements
        newLi.appendChild(deleteBtn);
        newLi.appendChild(taskText);

        // put them in the task list
        taskList.appendChild(newLi);
    })
}



document.getElementById('textInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addText();
    }
});

fetch("http://localhost:3000/api/words")
    .then((response) => response.json())
    .then((json) => renderList(json));


