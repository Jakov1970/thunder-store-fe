import { useAppSelector } from ".";

import {
  LS_AUTH_CURRENT_TIME,
  LS_AUTH_START_TIME,
  LS_FILE_PATH,
} from "../utils/consts";
import { filePathReducer } from "../utils/utility";

const saveAuthInfoInLocalStorage = (LOCAL_STORAGE_NAME: string, value: any) => {
  if (value) {
    localStorage.setItem(LOCAL_STORAGE_NAME, value);
  }
};

const useBeforeReload = () => {
  const { startTime, isLogin } = useAppSelector((state) => state.auth);
  const { filePath } = useAppSelector((state) => state.file);

  window.onbeforeunload = (event) => {
    saveAuthInfoInLocalStorage(LS_AUTH_START_TIME, startTime);
    saveAuthInfoInLocalStorage(LS_AUTH_CURRENT_TIME, isLogin ? Date.now() : 0);
    if (filePath.length === 1) {
      saveAuthInfoInLocalStorage(LS_FILE_PATH, filePath);
    } else {
      const path = filePath.reduce(filePathReducer);
      saveAuthInfoInLocalStorage(LS_FILE_PATH, path);
    }
  };
};

export default useBeforeReload;
