import { Severity } from "../consts";

export interface AuthState {
  refreshToken?: any;
  accessToken?: any;
  isLogin: boolean;
  startTime?: number;
  currentTime?: number;
}

export interface FileState {
  files: Array<SingleFileState>;
  showProgressBar: boolean;
  intervalDownload: number;
  showModal: boolean;
  previewFile: PreviewFile;
  filePath: string[];
}

export interface SingleFileState {
  filename: string;
  size: number;
  extension: any;
  id: any;
}

export interface NotificationState {
  notificationType: Severity;
  notificationMessage: string;
  notificationLoading: boolean;
}

export interface UserState {
  email: string;
  name: string;
  surname: string;
  bucketName: string;
}

export interface PreviewFile {
  name: string;
  size: number;
  url: string;
  type?: any;
}
