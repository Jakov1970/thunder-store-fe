import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { useAppSelector } from "../hooks";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export function Toast() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { notificationType, notificationMessage } = useAppSelector(
    (state) => state.ui
  );
  const [initalStart, setInitalStart] = useState(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (initalStart) {
      setOpen(true);
    }
    setInitalStart(true);
  }, [notificationType, notificationMessage]);

  return (
    <div className={classes.root}>
      {ReactDOM.createPortal(
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={notificationType}>
            {notificationMessage}
          </Alert>
        </Snackbar>,
        document.getElementById("toast")!
      )}
    </div>
  );
}
