export const FormFieldNames = {
  NAME: "Name",
  SURNAME: "Surname",
  EMAIL: "Email",
  PASSWORD: "Password",
  CONFIRM_PASSWORD: "Confirm Password",
};

export const SidebarData = [
  {
    title: "Add User",
    icon: "",
    link: "/addUser",
  },
  {
    title: "Organization",
    icon: "",
    link: "/organization",
  },
];

export const RegisterInputProps = [
  {
    name: "Name",
    type: "text",
  },
  {
    name: "Surname",
    type: "text",
  },
  {
    name: "Email",
    type: "email",
  },
  {
    name: "Password",
    type: "password",
  },
  {
    name: "Confirm Password",
    type: "password",
  },
];

export const LoginInputProps = [
  {
    name: "Email",
    type: "email",
  },
  {
    name: "Password",
    type: "password",
  },
];

export type Severity = "error" | "success" | "info" | "warning" | undefined;

export const NOTIFICATION_SUCCESS = "success";
export const NOTIFICATION_WARNING = "warning";
export const NOTIFICATION_ERROR = "error";
export const NOTIFICATION_INFO = "info";

export const TOKEN_TYPE = "Bearer ";

export const LS_AUTH_ACCESS_TOKEN = "AuthAccesToken";
export const LS_AUTH_REFRESH_TOKEN = "AuthRefreshToken";
export const LS_FILE_PATH = "FilePath";

export const LS_AUTH_CURRENT_TIME = "AuthCurrentTime";
export const LS_AUTH_START_TIME = "AuthStartTime";
export const LS_AUTH_IS_LOGIN = "AuthIsLogin";

export const TEST_1_MINUTE_MS = 10000;

const API = "http://a6c1-82-117-213-6.ngrok.io";
export const API_URL = API + "/api";
export const API_AUTH_URL =
  "http://8c7e-82-117-213-6.ngrok.io" + "/api" + "/v1";
export const API_UPLOAD_FILES = API_URL + "/upload-files/v1";
export const API_DELETE_FILES = API_URL + "/files/v1";
export const API_DELETE_ALL_FILES = API_URL + "/bucket-files";
export const API_FILE_LIST = API_URL + "/file-info/v1";
export const API_DOWNLOAD_ZIP = API_URL + "/files/v1";
export const API_DOWNLOAD_FILE = API_URL + "/file";
export const API_CREATE_FOLDER = API_URL + "/folder/v1";
export const API_ADD_USER = API_AUTH_URL + "/user";
export const API_CREATE_ORGANIZATION = API_AUTH_URL + "/organization";

export const DUMMY_DATA: any = [];

export const LOGOUT_CONFIRM = "yes";
export const LOGOUT_DENY = "no";
export const LOGOUT_MESSAGE = "Are you sure you want to log out?";

export const ROUTE_LOGIN = "/login";
export const ROUTE_HOME = "/home";
export const ROUTE_REGISTER = "/register";
export const ROUTE_GOOGLE_LOGIN = "/googleLogin";
export const ROUTE_GOOGLE_REGISTER = "/googleRegister";
export const ROUTE_REFRESH_TOKEN = "/refreshtoken";
export const ROUTE_USER_INFO = "/userInfo";

export const searchPlaceholder = "Search...";
export const inputType = "text";

export const GOOGLE_CLIENT_ID: string =
  process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

export const DOWNLOAD_BUTTON_TEXT = "Download";
export const DELETE_BUTTON_TEXT = "Delete";
export const PREVIEW_BUTTON_TEXT = "Preview";
export const DOWNLOAD_SELECTED_BUTTON_TEXT = "Download Selected";
export const DELETE_SELECTED_BUTTON_TEXT = "Delete Selected";

export const SELECTION_BUTTON_TEXT = "Select Multiple";
export const SELECTION_QUIT_BUTTON_TEXT = "Quit Selection";

export const CLASS_SELECTED = "selected";
export const CLASS_IDLE = "idle";

export const SPINNER_ANIMATION = "border";
export const SPINNER_VARIANT = "info";

export const SORT_LETTER_A = "letterAscending";
export const SORT_LETTER_D = "letterDescending";
export const SORT_SIZE_A = "sizeAscending";
export const SORT_SIZE_D = "sizeDescending";

export const SORT_LETTER_A_TEXT = "Name ↑";
export const SORT_LETTER_D_TEXT = "Name ↓";
export const SORT_SIZE_A_TEXT = "Size ↑";
export const SORT_SIZE_D_TEXT = "Size ↓";

export const GRID_VIEW = "Switch to Grid View";
export const LIST_VIEW = "Switch to List View";

export const SORT_DROPDOWN_INFO = [
  {
    value: "",
    text: "Sort By",
  },
  {
    value: SORT_LETTER_A,
    text: SORT_LETTER_A_TEXT,
  },
  {
    value: SORT_LETTER_D,
    text: SORT_LETTER_D_TEXT,
  },
  {
    value: SORT_SIZE_A,
    text: SORT_SIZE_A_TEXT,
  },
  {
    value: SORT_SIZE_D,
    text: SORT_SIZE_D_TEXT,
  },
];
export const SUCCESS_LOGIN = "Successfully Logged In";
export const SUCCESS_REGISTER = "Succesfully Registered an account.";
export const SUCCESS_REGISTER_GOOGLE =
  "Successfully Registered an account with Google";
export const SUCCESS_LOGOUT = "Successfully Logged Out";

export const ERROR_TRY_AGAIN =
  "Something went wrong! Please refresh and try again.";
export const ERROR_LOGIN = "The Email or Password you entered is inocrrect!";

export const DESCENDING = "DESC";
export const ASCENDING = "ASC";

export const CREATE_FOLDER = "Create Folder";
export const CANCEL = "Cancel";
