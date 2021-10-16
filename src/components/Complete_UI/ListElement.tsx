import { FunctionComponent } from "react";
import { ListElementContainer } from "../../styles";
import { ListElementType } from "../../utils/types/UserInterface";

export const ListElement: FunctionComponent<ListElementType> = ({
  content,
  onClick,
}) => <ListElementContainer onClick={onClick}>{content}</ListElementContainer>;
