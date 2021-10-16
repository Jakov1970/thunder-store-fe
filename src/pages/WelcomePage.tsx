import { Login } from "./Login";
import { useAppSelector } from "../hooks";
import { HomePage } from ".";
import { FunctionComponent } from "react";

export const WelcomePage: FunctionComponent = () => {
  const { isLogin } = useAppSelector((state) => state.auth);

  return <div>{!isLogin ? <Login /> : <HomePage />}</div>;
};
