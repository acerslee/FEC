import React, { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  thumbnail: {
    border: "1px solid #ddd",
    borderRadius: 4,
    padding: 5,
    width: 150,
  },
  fullSize: {
    border: "1px solid #ddd",
    maxWidth: "90vw",
    maxHeight: "90vh",
  },
}));

const ImageModal = ({ imageUrl }) => {
  const classes = useStyles();
  const [modalStyle] = useState({
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  });
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  var handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Link
        target="_blank"
        key={imageUrl}
        onClick={handleOpen}
        style={{ cursor: "zoom-in" }}
      >
        <img className={classes.thumbnail} src={imageUrl} />
      </Link>
      <Modal open={open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <img className={classes.fullSize} src={imageUrl} />
        </div>
      </Modal>
    </>
  );
};

export default ImageModal;
