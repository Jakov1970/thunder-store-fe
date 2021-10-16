import { FormFieldNames } from "../consts";
import { OptionInfoType, Setters } from "../types/UserInterface";
import { FormEvent } from "react";

const { NAME, SURNAME, EMAIL, PASSWORD, CONFIRM_PASSWORD } = FormFieldNames;

export const getFormSetter = (
  fieldName: string,
  fieldValue: string,
  setters: Setters
) => {
  const { setName, setSurname, setPassword, setConfirmPassword, setEmail } =
    setters;

  switch (fieldName) {
    case NAME: {
      setName && setName(fieldValue);
      break;
    }
    case SURNAME: {
      setSurname && setSurname(fieldValue);
      break;
    }
    case EMAIL: {
      setEmail(fieldValue);
      break;
    }
    case PASSWORD: {
      setPassword(fieldValue);
      break;
    }
    case CONFIRM_PASSWORD: {
      setConfirmPassword && setConfirmPassword(fieldValue);
    }
  }
};

export const FileFormSubmitHandler = (event: FormEvent) => {
  event.preventDefault();
};

export const validate = (getValidators: (Field: string) => any) => {
  let { NAME, SURNAME, PASSWORD, CONFIRM_PASSWORD, EMAIL } = FormFieldNames;

  return {
    emailState: getValidators(EMAIL),
    nameState: getValidators(NAME),
    surnameState: getValidators(SURNAME),
    passwordState: getValidators(PASSWORD),
    confirmPasswordState: getValidators(CONFIRM_PASSWORD),
  };
};

export const makeDropdownModel = (elements: Array<OptionInfoType>) =>
  elements.map(({ value, text }) => {
    const valueIsEmpty = value === "";
    return (
      <option value={value} disabled={valueIsEmpty} selected={valueIsEmpty}>
        {text}
      </option>
    );
  });
