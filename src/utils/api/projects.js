export const addProjectToLocalStorage = (localStorageKey, payload) => {
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
        itemObj.id = payload.id;

        arr.push(itemObj);
    }
    createItemObj(todoArray);
    localStorage.setItem(localStorageKey, JSON.stringify(todoArray));
}

export const addTaskToProject = (localStorageKey, payload) => {
    let taskArray = [];
    let localStorageData = localStorage.getItem(localStorageKey);

    if (localStorageData == null) {
        taskArray = [];
    } else {
        taskArray = JSON.parse(localStorageData);
    }

    const createItemObj = (arr) => {
        const itemObj = {};
        itemObj.name = payload.name;
        itemObj.projectId = payload.projectId;
        itemObj.taskId = payload.taskId;
        itemObj.done = false;
        arr.push(itemObj);
    }
    createItemObj(taskArray);
    localStorage.setItem(localStorageKey, JSON.stringify(taskArray));
}

export const getProjectFromLocalStorage = (localStorageKey) => {
    const project = localStorage.getItem(localStorageKey);
    return JSON.parse(project);
}

export const removeProjectToLocalStorage = (localStorageKey, id) => {
    if (confirm('Вы уверены?')) {
        const todoArray = JSON.parse(localStorage.getItem(localStorageKey));

        const neaList = todoArray.filter(obj => obj.id !== id);

        localStorage.setItem(localStorageKey, JSON.stringify(neaList));
    }
}
