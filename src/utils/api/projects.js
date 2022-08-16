export const addDataToLocalStorage = (localStorageKey, payload) => {
    let todoArray = [];
    let localStorageData = localStorage.getItem(localStorageKey);

    if (localStorageData == null) {
        todoArray = [];
    } else {
        todoArray = JSON.parse(localStorageData);
    }

    const createItemObj = (arr) => {
        const itemObj = {};
        itemObj.name = payload.name;
        if(payload.taskId) {
            itemObj.projectId = payload.projectId;
            itemObj.taskId = payload.taskId;
            itemObj.description = payload.description;
            itemObj.createDate = payload.createDate;
            itemObj.done = false;
        } else {
            itemObj.id = payload.id;
        }
        arr.push(itemObj);
    }
    createItemObj(todoArray);
    localStorage.setItem(localStorageKey, JSON.stringify(todoArray));
}

export const getDataFromLocalStorage = (localStorageKey) => {
    const project = localStorage.getItem(localStorageKey);
    return JSON.parse(project);
}

export const removeProjectToLocalStorage = (localStorageKey, id) => {
    const todoArray = JSON.parse(localStorage.getItem(localStorageKey));
    const neaList = todoArray.filter(obj => obj.id !== id);
    localStorage.setItem(localStorageKey, JSON.stringify(neaList));
}

export const removeTasksToLocalStorage = (localStorageKey, id) => {
    const tasksArray = JSON.parse(localStorage.getItem(localStorageKey));
    if (tasksArray !== null) {
        const neaList = tasksArray.filter(obj => obj.projectId !== id);
        localStorage.setItem(localStorageKey, JSON.stringify(neaList));
    }
}

export const changeCompleteTask = (item) => {
    const todoArray = JSON.parse(localStorage.getItem('tasks'));
    todoArray.map(obj => {
        if (obj.taskId === item.taskId && obj.done === false) {
            obj.done = true;
        } else if (obj.taskId === item.taskId && obj.done === true) {
            obj.done = false;
        }
    });
    console.log(todoArray)
    localStorage.setItem('tasks', JSON.stringify(todoArray));
}
