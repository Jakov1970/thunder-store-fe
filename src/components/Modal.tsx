import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useAppDispatch, useAppSelector } from "../hooks";
import { stopPreviewingFile } from "../store";
import { formatBytes, PreviewTagMap } from "../utils/validators";
import _get from "lodash/get";

const { Header, Title, Footer } = Modal;

export const PreviewModal = () => {
  const [show, setShow] = useState(true);

  const dispatch = useAppDispatch();

  const { name, type, size, url } = useAppSelector(
    (state) => state.file.previewFile
  );

  const handleClose = () => {
    setShow(false);
    dispatch(stopPreviewingFile());
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Header closeButton>
        <Title>{name}</Title>
      </Header>
      {_get(PreviewTagMap(url), type)}
      <Footer>
        <Title>Size: {formatBytes(size)}</Title>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="secondary" onClick={handleDownload}>
          download
        </Button>
      </Footer>
    </Modal>
  );
};
