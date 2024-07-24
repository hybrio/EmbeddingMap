function reloadGraph(datapoints, labels){
  chart.data = datapoints;
  chart.update();
}

function addItem(type, graphType) {
    const input = document.getElementById(type+"Input");
    const taskList = document.getElementById(type+"List");

    if (input.value.trim() === '') {
        alert('Please enter some text!');
        return;
    }

    fetch("http://localhost:3000/api/add-"+type, {
            method: "POST",
            body: JSON.stringify({
                input: input.value
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => renderList(json, type, graphType));


    input.value = '';
}

function removeItem(item, type, graphType) {
    const taskList = document.getElementById(type+"List");
    fetch("http://localhost:3000/api/del-"+type, {
            method: "POST",
            body: JSON.stringify({
                input: item
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((response) => response.json())
        .then((json) => renderList(json, type, graphType));
}

function renderList(list, type, graphType) {
    const taskList = document.getElementById(type+"List");
    taskList.replaceChildren()
    if(list.length > 0){      
      fetch("http://localhost:3000/api/generate-"+graphType+"-plot")
            .then((response) => response.json())
            .then((json) => reloadGraph(json));
    }
    list.forEach((item) => {

        // create delete button
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '✖';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            removeItem(item,type, graphType)
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


