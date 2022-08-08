export const addUserDataToLocalStorage = (localStorageKey, payload) => {
    const newValue = JSON.stringify(payload);
    localStorage.setItem(localStorageKey, newValue);
}

export const getUserDataFromLocalStorage = (localStorageKey) => {
    const userData = localStorage.getItem(localStorageKey);
    return JSON.parse(userData);
}

export const removeDataToLocalStorage = (localStorageKey) => {
    localStorage.removeItem(localStorageKey);
}
