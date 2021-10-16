import { UserFile } from "../../utils/types/actions";

import {
  NOTIFICATION_ERROR,
  NOTIFICATION_WARNING,
  NOTIFICATION_SUCCESS,
  API_URL,
  API_DELETE_ALL_FILES,
  ERROR_TRY_AGAIN,
} from "../../utils/consts";
import {
  sendNotification,
  startSpinner,
  stopSpinner,
  startDownloading,
  stopDownloading,
  getFiles,
  deleteAllFiles,
  startPreviewingFile,
  uploadFile,
} from "../slices";
import { routes } from "../../constants/routes";
import {
  fileUploadService,
  deleteFilesService,
  downloadFileService,
  getFilesPropertyService,
  downloadZipFileService,
  createFolderService,
} from "../../service";
import { filterTypeOfFile, PreviewType } from "../../utils/validators";
import { messages } from "../../constants/messages";
import { filePathReducer } from "../../utils/utility";
import { isConstructorDeclaration } from "typescript";

export const fileUploadAction = ({ folderPath, files, bucket }: any) => {
  return async (dispatch: any) => {
    dispatch(startSpinner());

    const res = await fileUploadService({
      folderPath,
      files,
      bucket,
    });
    const { message, data, ok } = res;
    if (ok) {
      dispatch(uploadFile(data));
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: message,
        })
      );
      dispatch(
        getFilesInfoAction({
          folderPath,
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: "Faild to upload the file",
        })
      );
    }
    dispatch(stopSpinner());
  };
};

export const deleteAllFilesAction = ({ name, surname, org }: UserFile) => {
  return async (dispatch: any) => {
    dispatch(startSpinner());
    const res = await deleteFilesService({
      rute: API_DELETE_ALL_FILES,
      name,
      surname,
      org,
    });

    if (res.ok) {
      dispatch(deleteAllFiles());
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: "Successfully Delete all files",
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: "Faild to delete all files",
        })
      );
    }
    dispatch(stopSpinner());
  };
};

export const deleteFileAction = ({ folderPath, files, bucket }: any) => {
  return async (dispatch: any) => {
    dispatch(startSpinner());

    const res = await deleteFilesService({
      folderPath,
      files,
      bucket,
    });

    if (res.ok) {
      dispatch(
        getFilesInfoAction({
          folderPath,
        })
      );
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: "Successfully Delete file",
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: "Faild to delete file",
        })
      );
    }
    dispatch(stopSpinner());
  };
};

export const getFilesInfoAction = ({ folderPath }: any) => {
  return async (dispatch: any) => {
    dispatch(startSpinner());
    const res = await getFilesPropertyService({ folderPath });
    const { ok, data } = res;
    if (ok) {
      dispatch(getFiles(data));
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_WARNING,
          message: "The folder is empty",
        })
      );
    }
    dispatch(stopSpinner());
  };
};

export const downloadFileAction = ({ folderPath, file }: any) => {
  return async (dispatch: any) => {
    dispatch(startDownloading());

    const res = await dispatch(downloadFileService({ folderPath, file }));
    const { ok, data } = res;
    if (ok) {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.download = file;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: "Successfully download file",
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: "Failed to download file",
        })
      );
    }
    dispatch(stopDownloading());
  };
};

export const downloadZipFileAction = ({ files, folderPath }: any) => {
  return async (dispatch: any) => {
    dispatch(startDownloading());
    const res = await dispatch(downloadZipFileService({ files, folderPath }));
    const { ok, data } = res;
    if (ok) {
      if (data.size === 22) {
        return dispatch(
          sendNotification({
            type: NOTIFICATION_ERROR,
            message: "Fail is not found",
          })
        );
      }
      const url = window.URL.createObjectURL(
        new Blob([data], { type: "application/zip" })
      );
      const link = document.createElement("a");
      link.href = url;
      link.download = "download";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: "Successfully download file",
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: "Faild to download file",
        })
      );
    }

    dispatch(stopDownloading());
  };
};

export const previewFileAction = ({ folderPath, file }: any) => {
  return async (dispatch: any) => {
    dispatch(startDownloading());
    const res = await dispatch(downloadFileService({ folderPath, file }));

    const { ok, data } = res;
    if (ok) {
      const url = window.URL.createObjectURL(
        new Blob(
          [data],
          filterTypeOfFile(file) === PreviewType.PDF
            ? { type: "application/pdf" }
            : undefined
        )
      );
      const type = filterTypeOfFile(data.type);
      if (type) {
        dispatch(
          startPreviewingFile({
            showModal: true,
            url,
            name: file,
            size: data.size,
            type,
          })
        );
      }
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: messages.PREVIEW_FILE_ERROR,
        })
      );
    }
    dispatch(stopDownloading());
  };
};

export const createFolderAction = (
  folderPath: string,
  bucketName: string,
  folder: string
) => {
  return async (dispatch: any) => {
    console.log(folderPath);
    dispatch(startSpinner());
    const res = await createFolderService(folderPath, bucketName);
    const { ok } = res;
    if (ok) {
      dispatch(
        getFilesInfoAction({
          folderPath: folder,
        })
      );
      dispatch(
        sendNotification({
          type: NOTIFICATION_SUCCESS,
          message: "Folder was created",
        })
      );
    } else {
      dispatch(
        sendNotification({
          type: NOTIFICATION_ERROR,
          message: "Folder wasn’t created",
        })
      );
    }
    dispatch(stopSpinner());
  };
};
