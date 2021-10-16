import { FunctionComponent, useEffect } from "react";
import { Navbar } from "../components";
import { Sidebar } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { userInfoAction } from "../store/actions/user-actions";
import { FlexContainer, MainDiv, Section } from "../styles";

export const UserPage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  const {
    email: userEmail,
    name: userName,
    surname: userSurname,
  } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(userInfoAction(accessToken));
  }, [userEmail, userName, userSurname]);

  return (
    <MainDiv>
      <Navbar />
      <Section>
        <Sidebar />
        <FlexContainer>
          <div>Email: {userEmail}</div>
          <div>Name: {userName}</div>
          <div>Surname: {userSurname}</div>
        </FlexContainer>
      </Section>
    </MainDiv>
  );
};
