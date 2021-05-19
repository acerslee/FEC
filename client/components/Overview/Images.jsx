import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Link from "@material-ui/core/Link";

const OverviewImage = styled.img`
  height: 40rem;
  width: 40rem;
`;

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fullSize: {
    border: "1px solid #ddd",
    maxWidth: "90vw",
    maxHeight: "90vh",
  },
}));


const Images = ({currentProductStyles, currentImageSet}) => {
  // console.log('styles', currentProductStyles)
  // console.log('currentimage', currentImageSet);
  const classes = useStyles();
  const [modalStyle] = useState({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  });
  const [open, setOpen] = useState(false);

  const [currentMainImage, setCurrentMainImage] = useState('');
  const [styleDescription, setStyleDescription] = useState('');
  // const [currentMiniImages, setCurrentMiniImages] = useState();

  const handleOpen = () => {
    setOpen(!open)
  };

  const handleClose = () => {
    setOpen(!open)
  };

  useEffect(() => {
    setCurrentMainImage(currentProductStyles.results[0].photos[0].thumbnail_url);
    console.log('does this run')
    currentImageSet = null;
  },[currentProductStyles])


  let currentImage;
  if (Object.keys(currentImageSet).length) currentImage = currentImageSet.photos[0].thumbnail_url;
  else currentImage = currentMainImage;

  return(
    <div className = 'images'>
      <Link
        target = '_blank'
        onClick = {handleOpen}
      >
        <OverviewImage src = {currentImage} alt = 'cloth-image' />
      </Link>
      <Modal open = {open} onClose = {handleClose}>
        <div style = {modalStyle} className = {classes.paper}>
          <img className = {classes.fullSize} src = {currentImage} />
        </div>
      </Modal>
    </div>
  )
};

export default Images;