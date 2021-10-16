import { FormEvent, useState } from "react";
import { useAppDispatch } from "..";
import { googleRegisterAction, loginAction } from "../../store";
import { getFormSetter } from "../../utils/functions/UserInterface";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();

  const googleResponseHandler = (response: any) => {
    const userData = {
      name: response.profileObj.givenName,
      surname: response.profileObj.familyName,
      email: response.profileObj.email,
    };
    dispatch(googleRegisterAction(userData));
  };

  const changeHandler = (val: string, name: string) => {
    getFormSetter(name, val, { setEmail, setPassword });
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (password !== "" && email !== "") {
      const userData = {
        email,
        password,
      };
      dispatch(loginAction(userData));
    }
  };

  return {
    submitHandler,
    changeHandler,
    googleResponseHandler,
  };
};
