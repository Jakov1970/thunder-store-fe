import { useState, FormEvent } from "react";
import { useAppDispatch } from "..";
import { registerAction } from "../../store";
import { FormFieldNames } from "../../utils/consts";
import { getFormSetter, validate } from "../../utils/functions/UserInterface";
import {
  nameAndSurnameValidator,
  passwordValidator,
  confirmPasswordValidator,
  emailValidator,
} from "../../utils/validators";

export const useRegister = () => {
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [messages, setMesssages] = useState({
    errorName: "",
    errorSurname: "",
    errorEmail: "",
    errorPassword: "",
    errorConfirmPassword: "",
  });

  const dispatch = useAppDispatch();

  const setters = {
    setName,
    setSurname,
    setEmail,
    setPassword,
    setConfirmPassword,
  };

  const getValidators = (Field: string) => {
    let { NAME, SURNAME, PASSWORD, CONFIRM_PASSWORD, EMAIL } = FormFieldNames;
    return {
      [NAME]: nameAndSurnameValidator(name, NAME),
      [SURNAME]: nameAndSurnameValidator(surname, SURNAME),
      [PASSWORD]: passwordValidator(password),
      [CONFIRM_PASSWORD]: confirmPasswordValidator(confirmPassword, password),
      [EMAIL]: emailValidator(email),
    }[Field];
  };

  const {
    emailState,
    nameState,
    surnameState,
    passwordState,
    confirmPasswordState,
  }: any = validate(getValidators);

  const isAllValid: boolean =
    emailState.isValid &&
    nameState.isValid &&
    passwordState.isValid &&
    confirmPasswordState.isValid &&
    surnameState.isValid;

  const errorHandler = () => {
    if (!emailState.isValid) {
      setMesssages((prevState) => {
        return { ...prevState, errorEmail: emailState.message };
      });
    }
    if (!nameState.isValid) {
      setMesssages((prevState) => {
        return { ...prevState, errorName: nameState.message };
      });
    }
    if (!surnameState.isValid) {
      setMesssages((prevState) => {
        return { ...prevState, errorSurname: surnameState.message };
      });
    }
    if (!passwordState.isValid) {
      setMesssages((prevState) => {
        return { ...prevState, errorPassword: passwordState.message };
      });
    }
    if (!confirmPasswordState.isValid) {
      setMesssages((prevState) => {
        return {
          ...prevState,
          errorConfirmPassword: confirmPasswordState.message,
        };
      });
    }
  };

  const changeHandler = (val: string, name: string) => {
    getFormSetter(name, val, setters);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    setMesssages({
      errorName: "",
      errorSurname: "",
      errorEmail: "",
      errorPassword: "",
      errorConfirmPassword: "",
    });

    if (isAllValid) {
      dispatch(
        registerAction({
          name,
          surname,
          email,
          password,
        })
      );
    } else {
      errorHandler();
    }
  };

  const showErrorMessages = (inputName: string) => {
    let { NAME, SURNAME, PASSWORD, CONFIRM_PASSWORD, EMAIL } = FormFieldNames;

    const {
      errorName,
      errorSurname,
      errorEmail,
      errorPassword,
      errorConfirmPassword,
    } = messages;

    return {
      [NAME]: errorName,
      [SURNAME]: errorSurname,
      [PASSWORD]: errorPassword,
      [CONFIRM_PASSWORD]: errorConfirmPassword,
      [EMAIL]: errorEmail,
      default: null,
    }[inputName];
  };

  return {
    submitHandler,
    changeHandler,
    showErrorMessages,
  };
};
