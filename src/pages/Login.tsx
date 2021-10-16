import { AuthFlexContainer } from "../styles";
import { LoginForm } from "../components";
import { useLogin } from "../hooks";

export const Login = () => {
  const { submitHandler, changeHandler, googleResponseHandler } = useLogin();

  return (
    <AuthFlexContainer>
      <LoginForm
        onSubmit={submitHandler}
        onChange={changeHandler}
        onSuccess={googleResponseHandler}
      />
    </AuthFlexContainer>
  );
};
