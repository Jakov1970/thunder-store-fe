import { Backdrop, Modal, ButtonContainer } from "../../styles";
import { PopupButtons } from "../../styles";
import { SyntheticEvent, useRef } from "react";
import { PopupProps } from "../../utils/types/UserInterface";
import { JsxElement } from "typescript";

export const Popup = ({
  content,
  getClosingState,
  actionTaken,
  popupConfirm,
  popupDeny,
}: PopupProps) => {
  const confirmActionRef = useRef<HTMLButtonElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  const sendClosingState = ({ target }: SyntheticEvent) => {
    if (target === confirmActionRef.current) {
      actionTaken();
      getClosingState(false);
    }
    if (target === backdropRef.current || target === cancelRef.current) {
      getClosingState(false);
    }
  };

  const setContent = (content: string | Element) =>
    typeof content === "string" ? <h3>{content}</h3> : content;

  return (
    <Backdrop onClick={sendClosingState} ref={backdropRef}>
      <Modal>
        {setContent(content)}
        <ButtonContainer>
          <PopupButtons onClick={sendClosingState} ref={confirmActionRef}>
            {popupConfirm}
          </PopupButtons>
          <PopupButtons onClick={sendClosingState} ref={cancelRef}>
            {popupDeny}
          </PopupButtons>
        </ButtonContainer>
      </Modal>
    </Backdrop>
  );
};
