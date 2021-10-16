import { useAppSelector } from "../hooks";
import ProgressBar from "react-bootstrap/ProgressBar";
export function Progress() {
  const { intervalDownload } = useAppSelector((state) => state.file);

  return <ProgressBar now={intervalDownload} label={`${intervalDownload}%`} />;
}
