import { FunctionComponent } from "react";
import useToggle from "../hooks/useToggle";
import { SortContainer, SortContainerElement } from "../styles";
import {
  SORT_LETTER_A,
  SORT_LETTER_A_TEXT,
  SORT_LETTER_D,
  SORT_LETTER_D_TEXT,
  SORT_SIZE_A,
  SORT_SIZE_A_TEXT,
  SORT_SIZE_D,
  SORT_SIZE_D_TEXT,
} from "../utils/consts";

export interface SortInfoPropsType {
  setSortValue: (value: string) => void;
}

export const SortInfoContainer: FunctionComponent<SortInfoPropsType> = ({
  setSortValue,
}) => {
  const [sortName, toggleSortName] = useToggle(true);
  const [sortSize, toggleSortSize] = useToggle(true);

  const sortByName = () => {
    sortName ? setSortValue(SORT_LETTER_A) : setSortValue(SORT_LETTER_D);
    toggleSortName();
  };

  const sortBySize = () => {
    sortSize ? setSortValue(SORT_SIZE_A) : setSortValue(SORT_SIZE_D);
    toggleSortSize();
  };

  const setNameFieldText = () =>
    sortName ? SORT_LETTER_A_TEXT : SORT_LETTER_D_TEXT;
  const setSizeFieldText = () =>
    sortSize ? SORT_SIZE_A_TEXT : SORT_SIZE_D_TEXT;

  return (
    <SortContainer>
      <SortContainerElement onClick={sortByName}>
        {setNameFieldText()}
      </SortContainerElement>
      <SortContainerElement onClick={sortBySize}>
        {setSizeFieldText()}
      </SortContainerElement>
    </SortContainer>
  );
};
