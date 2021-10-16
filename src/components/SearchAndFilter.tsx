import { FlexContainer, SearchLabel, StyledInput } from "../styles";
import { SearchAndFilterPropsType } from "../utils/types/UserInterface";

export const SearchAndFilter = ({ inputValues }: SearchAndFilterPropsType) => (
  <FlexContainer search={true}>
    <StyledInput
      name="search"
      type="text"
      placeholder="Search"
      onChange={inputValues}
    />
  </FlexContainer>
);
