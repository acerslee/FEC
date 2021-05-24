import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Link from "@material-ui/core/Link";
import {FaExpand} from 'react-icons/fa'
import Carousel from 'react-bootstrap/Carousel';


const ImageContainer = styled.div`
  height: 40rem;
  width: 40rem;
  position: relative;
`;

const OverviewImage = styled.img`
  height: 100%;
  width: 100%;
`;

const MiniImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5%;
  left: 5%;
`;

const MiniImageStyle = styled.img`
  height: 3.5em;
  width: 3.5em;
  margin-top: 1em;
`;

const useStyles = makeStyles(theme => ({
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
  const classes = useStyles();
  const [modalStyle] = useState({
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  });
  const [open, setOpen] = useState(false);

  const [currentMainImage, setCurrentMainImage] = useState('');
  const [currentImageStyleSet, setCurrentImageStyleSet] = useState([]);
  const [styleDescription, setStyleDescription] = useState('');

  //carousel states
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleOpen = () => {
    setOpen(!open)
  };

  const handleClose = () => {
    setOpen(!open)
  };

  const handleMiniImageClick = (thumbnail) => {
    setCurrentMainImage(thumbnail);
  };

  useEffect(() => {
    if (!Object.keys(currentImageSet).length){
      setCurrentMainImage(currentProductStyles.results[0].photos[0].thumbnail_url)
      setCurrentImageStyleSet(currentProductStyles.results[0].photos)
    } else {
      setCurrentMainImage(currentImageSet.photos[0].thumbnail_url)
      setCurrentImageStyleSet(currentImageSet.photos);
    }
  },[currentImageSet])

  return(
    <ImageContainer>
      {/* <Carousel activeIndex = {index} onSelect = {handleSelect}> */}
        <Link
          target = '_blank'
          onClick = {handleOpen}
        >
          <FaExpand
            style = {{
              position: 'relative',
              left: '95%',
              top: '8%'
            }}
          />
        </Link>

        <OverviewImage src = {currentMainImage} alt = 'cloth-image' />
        <Modal open = {open} onClose = {handleClose}>
          <div style = {modalStyle} className = {classes.paper}>
            <img className = {classes.fullSize} src = {currentMainImage} />
          </div>
        </Modal>
        <MiniImagesContainer>
          {currentImageStyleSet.map((styleimage, index) => (
            <MiniImageStyle
              key = {index}
              src = {styleimage.thumbnail_url}
              alt = 'style mini thumbnails'
              onClick = {() => handleMiniImageClick(styleimage.thumbnail_url)}
            />
          ))}
        </MiniImagesContainer>
      {/* </Carousel> */}
    </ImageContainer>
  )
};

export default Images;