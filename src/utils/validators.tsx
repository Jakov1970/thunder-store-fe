export const nameAndSurnameValidator = (value: string, fieldName: string) => {
  if (value === "")
    return {
      value,
      isValid: false,
      message: `Please enter a ${fieldName}`,
    };
  if (!/[a-zA-Z]/.test(value))
    return {
      value,
      isValid: false,
      message: `Please enter a valid ${fieldName}`,
    };
  if (value.indexOf(" ") >= 0)
    return {
      value,
      isValid: false,
      message: "Please fill this field with no whitespaces.",
    };
  return { value, isValid: true, message: "This field is ok." };
};

export const passwordValidator = (value: string) => {
  if (value === "")
    return {
      value,
      isValid: false,
      message: "Please enter a Password",
    };
  if (value.indexOf(" ") >= 0)
    return {
      value,
      isValid: false,
      message: "Please enter a Password with no whitespace.",
    };
  if (value.trim().length < 7)
    return {
      value,
      isValid: false,
      message: "Please enter a valid Password with min length of 8.",
    };
  if (value.trim().length > 32)
    return {
      value,
      isValid: false,
      message: "Please enter a valid Password with max length of 32.",
    };
  if (!/[A-Z]/.test(value))
    return {
      value,
      isValid: false,
      message: "Please enter a valid Password with min one Capital letter.",
    };
  if (!/[0-9]/.test(value))
    return {
      value,
      isValid: false,
      message: "Please enter a valid Password with min one Number.",
    };
  return { value, isValid: true, message: "This field is ok." };
};

export const emailValidator = (value: string) => {
  if (value.indexOf(" ") >= 0)
    return {
      value,
      isValid: false,
      message: "Please enter an email with no whitespace.",
    };
  if (value === "")
    return {
      value,
      isValid: false,
      message: "Please enter an Email",
    };
  return { value, isValid: true, message: "This field is ok." };
};

export const confirmPasswordValidator = (value: string, password: string) => {
  if (value !== password) {
    return { value, isValid: false, message: "You must confirm your Password" };
  }
  return { value, isValid: true, message: "This field is ok." };
};

export const filterTypeOfFile = (value: string) => {
  if (/image/.test(value)) return PreviewType.IMAGE;
  if (/text/.test(value)) return PreviewType.TEXT;
  if (/javascript/.test(value)) return PreviewType.TEXT;
  if (/pdf/.test(value)) return PreviewType.PDF;
  if (/audio/.test(value)) return PreviewType.AUDIO;
  if (/video/.test(value)) return PreviewType.VIDEO;
  return null;
};

export const formatBytes = (bytes: number, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const PreviewType = {
  IMAGE: "image",
  PDF: "pdf",
  TEXT: "text",
  VIDEO: "video",
  AUDIO: "audio",
};

export const HeaderType = {
  AUTHORIZATION: "Authorization",
  CONTENT_TYPE: "Content-Type",
};

export const Content_Type_Value = {
  APP_JSON: "application/json",
};

const getPreviewImgTag = (url: string) => <img src={url}></img>;
const getPreviewTextOrPDFTag = (url: string) => <object data={url}></object>;
const getPreviewAudioTag = (url: string) => (
  <audio controls>
    <source src={url} />
  </audio>
);
const getPreviewVideoTag = (url: string) => (
  <video width="320" height="240" controls>
    <source src={url} />
  </video>
);

export const PreviewTagMap = (url: string) => {
  return {
    [PreviewType.IMAGE]: getPreviewImgTag(url),
    [PreviewType.TEXT]: getPreviewTextOrPDFTag(url),
    [PreviewType.AUDIO]: getPreviewAudioTag(url),
    [PreviewType.VIDEO]: getPreviewVideoTag(url),
    [PreviewType.PDF]: getPreviewTextOrPDFTag(url),
  };
};
