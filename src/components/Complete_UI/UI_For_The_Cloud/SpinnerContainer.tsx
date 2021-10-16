import Spinner from "react-bootstrap/Spinner";
import { FlexContainer } from "../../../styles";
import { SPINNER_ANIMATION, SPINNER_VARIANT } from "../../../utils/consts";

export const SpinnerContainer = () => (
  <FlexContainer>
    <Spinner animation={SPINNER_ANIMATION} variant={SPINNER_VARIANT} />
  </FlexContainer>
);
