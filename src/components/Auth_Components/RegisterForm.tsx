import { Link } from "react-router-dom";
import { Input } from "..";
import { routes } from "../../constants/routes";
import { AuthFormButton, AuthFormContainer, ErrorMessage } from "../../styles";
import { TYPE_SUBMIT } from "../../utils/buttonTypes";
import { RegisterInputProps } from "../../utils/consts";
import { AuthFormProps } from "../../utils/types/UserInterface";

export const RegisterForm = ({
  onSubmit,
  onChange,
  messages,
}: AuthFormProps) => {
  const { LOG_IN } = routes;

  return (
    <AuthFormContainer onSubmit={onSubmit}>
      <h3>Please Register an account</h3>
      {RegisterInputProps.map((prop, index) => (
        <>
          <Input info={prop} getValueHandler={onChange} key={index} />
          {messages && <ErrorMessage>{messages(prop.name)}</ErrorMessage>}
        </>
      ))}
      <AuthFormButton type={TYPE_SUBMIT}>Register</AuthFormButton>
      <div>If You already have an account,</div>
      <Link to={LOG_IN}>Click here</Link>
    </AuthFormContainer>
  );
};
