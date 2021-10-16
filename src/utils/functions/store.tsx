export const getValueFromLocalStorage = (LOCAL_STORAGE_NAME: string) => {
    const valueFromLocal = localStorage.getItem(LOCAL_STORAGE_NAME) || null;
    localStorage.removeItem(LOCAL_STORAGE_NAME);
    return valueFromLocal;
};