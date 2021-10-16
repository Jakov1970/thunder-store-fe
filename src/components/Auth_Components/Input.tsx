import { ChangeEvent } from "react";
import { InputContainer, StyledInput } from "../../styles";
import { InputProps } from "../../utils/types/UserInterface";

export const Input = ({
  info: { name, type },
  getValueHandler,
}: InputProps) => {
  const getValue = ({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
    getValueHandler(currentTarget.value, currentTarget.name);
  };

  const checkName = (name: string) => {
    if (name === "confirmPassword") {
      return "Confirm Password";
    } else {
      return name;
    }
  };

  return (
    <InputContainer>
      <StyledInput
        type={type}
        name={checkName(name)}
        placeholder={checkName(name)}
        onChange={getValue}
      />
    </InputContainer>
  );
};
