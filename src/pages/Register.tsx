import { FunctionComponent } from "react";
import { RegisterForm } from "../components";
import { AuthFlexContainer } from "../styles";
import { useRegister } from "../hooks";

export const Register: FunctionComponent = () => {
  const { submitHandler, changeHandler, showErrorMessages } = useRegister();

  return (
    <AuthFlexContainer>
      <RegisterForm
        onSubmit={submitHandler}
        onChange={changeHandler}
        messages={showErrorMessages}
      ></RegisterForm>
    </AuthFlexContainer>
  );
};
