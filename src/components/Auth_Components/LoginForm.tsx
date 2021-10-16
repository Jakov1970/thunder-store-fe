import { AuthFormContainer, AuthFormButton } from "../../styles";
import { Input } from "..";
import { GoogleLogin } from "react-google-login";
import { routes } from "../../constants/routes";
import { Link } from "react-router-dom";
import { AuthFormProps } from "../../utils/types/UserInterface";
import { GOOGLE_CLIENT_ID, LoginInputProps } from "../../utils/consts";
import { TYPE_SUBMIT } from "../../utils/buttonTypes";

export const LoginForm = ({ onSubmit, onChange, onSuccess }: AuthFormProps) => (
  <AuthFormContainer onSubmit={onSubmit}>
    <h3>Please Log in</h3>
    {LoginInputProps.map((props, key) => (
      <Input info={props} getValueHandler={onChange} key={key} />
    ))}
    <AuthFormButton type={TYPE_SUBMIT}>Log in</AuthFormButton>
    <GoogleLogin
      clientId={GOOGLE_CLIENT_ID}
      buttonText="Sign In with Google"
      onSuccess={onSuccess}
      cookiePolicy={"single_host_origin"}
      isSignedIn={false}
    />
    <div>If You don't have an account,</div>
    <Link to={routes.REGISTER}>Click here</Link>
  </AuthFormContainer>
);
