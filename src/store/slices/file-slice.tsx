import { createSlice } from "@reduxjs/toolkit";
import { FileState, SingleFileState } from "../../utils/types/slice";
import { RootState } from "./../index";
import { LS_FILE_PATH } from "../../utils/consts";

export const initialSingleFileState: SingleFileState = {
  filename: "",
  size: 0,
  extension: "",
  id: 0,
};

export const initialFileState: FileState = {
  files: new Array<SingleFileState>(),
  showProgressBar: false,
  intervalDownload: 0,
  showModal: false,
  previewFile: { name: "", size: 0, url: "", type: null },
  filePath: localStorage.getItem(LS_FILE_PATH)?.split("/") || [""],
};

const fileSlice = createSlice({
  name: "file",
  initialState: initialFileState,
  reducers: {
    uploadFile: (state, action) => {
      action.payload.map((file: SingleFileState) =>
        state.files.push({ ...file })
      );
    },
    getFiles: (state, action) => {
      state.files = action.payload;
    },
    deleteFiles: (state, action) => {
      action.payload.map(
        (ActionFile: any) =>
          (state.files = state.files.filter(
            (file: any) => file.id !== ActionFile.id
          ))
      );
    },
    deleteAllFiles: (state) => {
      state.files = new Array<SingleFileState>();
    },
    startDownloading: (state) => {
      state.showProgressBar = true;
    },
    stopDownloading: (state) => {
      state.showProgressBar = false;
      state.intervalDownload = 0;
    },
    intervalUpdate: (state, action) => {
      state.intervalDownload = action.payload;
    },
    startPreviewingFile: (state, action) => {
      state.showModal = true;
      state.previewFile.name = action.payload.name;
      state.previewFile.size = action.payload.size;
      state.previewFile.url = action.payload.url;
      state.previewFile.type = action.payload.type;
    },
    stopPreviewingFile: (state) => {
      state.showModal = false;
      state.previewFile = { name: "", size: 0, url: "", type: null };
    },
    filePathNext: (state, action) => {
      state.filePath.push(action.payload);
    },
    filePathBack: (state) => {
      state.filePath.pop();
    },
    filePathLogOut: (state) => {
      state.filePath = [""];
    },
  },
});

export const {
  uploadFile,
  getFiles,
  deleteFiles,
  deleteAllFiles,
  startDownloading,
  stopDownloading,
  intervalUpdate,
  startPreviewingFile,
  stopPreviewingFile,
  filePathNext,
  filePathBack,
  filePathLogOut,
} = fileSlice.actions;
export const file = (state: RootState) => state.file;
export default fileSlice.reducer;
