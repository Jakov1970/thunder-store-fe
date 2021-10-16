import axios from "axios";
import {
  API_UPLOAD_FILES,
  API_FILE_LIST,
  API_DOWNLOAD_ZIP,
  API_URL,
  API_DOWNLOAD_FILE,
  API_CREATE_FOLDER,
  API_ADD_USER,
  LS_AUTH_ACCESS_TOKEN,
  TOKEN_TYPE,
  API_CREATE_ORGANIZATION,
  API_DELETE_FILES,
} from "../utils/consts";
import { intervalUpdate } from "../store/slices/file-slice";
import { AuthResponseType, blobType } from "../utils/types/services";
import { messagesTemplate } from "../utils/messageTemplate";
import { calcProgressBar } from "../utils/utility";
import { Content_Type_Value, HeaderType } from "../utils/validators";

const initialResponse: AuthResponseType = {
  ok: false,
  status: 0,
  message: "",
  data: null,
};

const axiosInstance = axios.create({
  baseURL: API_URL,
});
const { AUTHORIZATION, CONTENT_TYPE } = HeaderType;
const { APP_JSON } = Content_Type_Value;

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(LS_AUTH_ACCESS_TOKEN);
    if (token) {
      config.headers[AUTHORIZATION] = TOKEN_TYPE + token;
    }
    config.headers[CONTENT_TYPE] = APP_JSON;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const fileUploadService = async ({ folderPath, files, bucket }: any) => {
  try {
    const formData = new FormData();
    files.forEach((item: string) => {
      formData.append("files", item);
    });
    formData.append("folder", folderPath);
    formData.append("bucket", bucket);
    const response = await axios.post(API_UPLOAD_FILES, formData);
    const { data, message, status } = response.data;
    initialResponse.status = status;
    initialResponse.ok = true;
    initialResponse.message = message;
    if (response.data) {
      initialResponse.data = data;
    }
  } catch (err: any) {
    if (err.response) {
      initialResponse.status = err.response.status;
    }
    initialResponse.ok = false;
    initialResponse.message = err;
  }
  return initialResponse;
};

export const deleteFilesService = async ({
  folderPath,
  files,
  bucket,
}: any) => {
  try {
    const fileName = files.join(", ");
    const formData = new FormData();
    formData.append("files", fileName);
    formData.append("bucket", bucket);
    formData.append("folder", folderPath);
    const response = await axios({
      method: "DELETE",
      url: API_DELETE_FILES,
      data: formData,
    });
    const { data, message, status } = response.data;
    initialResponse.status = status;
    initialResponse.ok = true;
    initialResponse.message = message;
    if (response.data) {
      initialResponse.data = data;
    }
  } catch (err: any) {
    if (err.response) {
      initialResponse.status = err.response.status;
    }
    initialResponse.ok = false;
    initialResponse.message = err;
  }
  return initialResponse;
};

export const downloadFileService = ({ folderPath, file }: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.get(`${API_DOWNLOAD_FILE}/${file}/v1`, {
        params: { folder: folderPath },
        responseType: blobType,
        onDownloadProgress: ({ loaded, total }) => {
          dispatch(intervalUpdate(calcProgressBar(loaded, total)));
        },
      });
      initialResponse.status = response.status;
      initialResponse.ok = true;
      initialResponse.message = messagesTemplate.SUCCESS;

      if (response.data) {
        initialResponse.data = response.data;
      }
    } catch (err: any) {
      if (err.response) {
        initialResponse.status = err.response.status;
      }
      initialResponse.ok = false;
      initialResponse.message = err;
    }
    return initialResponse;
  };
};

export const getFilesPropertyService = async ({ folderPath }: any) => {
  try {
    const response = await axios.get(API_FILE_LIST, {
      params: { folder: folderPath },
    });
    initialResponse.status = response.status;
    initialResponse.ok = true;
    initialResponse.message = messagesTemplate.SUCCESS;
    if (response.data) {
      initialResponse.data = response.data.data;
    }
  } catch (err: any) {
    if (err.response) {
      initialResponse.status = err.response.status;
    }
    initialResponse.ok = false;
    initialResponse.message = err;
  }
  return initialResponse;
};

export const downloadZipFileService = ({ files, folderPath }: any) => {
  return async (dispatch: any) => {
    try {
      const filesName = files.join(", ");
      console.log(filesName);
      const response = await axios.get(API_DOWNLOAD_ZIP, {
        responseType: blobType,
        params: { files: filesName, folder: folderPath },
        onDownloadProgress: ({ loaded, total }) => {
          dispatch(intervalUpdate(calcProgressBar(loaded, total)));
        },
      });
      initialResponse.status = response.status;
      initialResponse.ok = true;
      initialResponse.message = messagesTemplate.SUCCESS;
      if (response.data) {
        initialResponse.data = response.data;
      }
    } catch (err: any) {
      initialResponse.ok = false;
      initialResponse.message = err;
    }
    return initialResponse;
  };
};

export const createFolderService = async (
  folderPath: string,
  bucket: string
) => {
  try {
    const formData = new FormData();
    formData.append("folder", folderPath);
    formData.append("bucket", bucket);
    const response = await axios.post(API_CREATE_FOLDER, formData);
    initialResponse.status = response.status;
    initialResponse.ok = true;
    initialResponse.message = messagesTemplate.SUCCESS;
    if (response.data) {
      initialResponse.data = response.data.data;
    }
  } catch (err: any) {
    initialResponse.ok = false;
    initialResponse.message = err;
  }
  return initialResponse;
};

export const createUserService = async (orgData: any) => {
  try {
    const response = await axios.post(API_ADD_USER, {
      email: orgData.data,
    });
    const { data, message, status } = response.data;
    initialResponse.status = status;
    initialResponse.ok = true;
    initialResponse.message = message;
    if (response.data) {
      initialResponse.data = data;
    }
  } catch (err: any) {
    if (err.response) {
      initialResponse.status = err.response.status;
    }
    initialResponse.ok = false;
    initialResponse.message = err;
  }
  return initialResponse;
};

export const createOrganizationService = async (orgData: any) => {
  try {
    const response = await axios.post(API_CREATE_ORGANIZATION, {
      name: orgData.organizationName,
      description: orgData.organizationDescription,
    });
    const { data, message, status } = response.data;
    initialResponse.status = status;
    initialResponse.ok = true;
    initialResponse.message = message;
    if (response.data) {
      initialResponse.data = data;
    }
  } catch (err: any) {
    if (err.response) {
      initialResponse.status = err.response.status;
    }
    initialResponse.ok = false;
    initialResponse.message = err;
  }
  return initialResponse;
};
