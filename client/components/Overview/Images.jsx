import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { FaExpand } from 'react-icons/fa';

const ImageContainer = styled.div`
  position: relative;
`;

const OverviewImage = styled.img`
  height: 40em;
  width: 43em;
`;

const MiniImagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0%;
  left: 10%;
  height: 40vh;
  overflow-y: scroll;
`;

const MiniImageStyle = styled.img`
  height: 3.5em;
  width: 3.5em;
  margin-top: 1em;
`;

const PhotoExpand = styled(FaExpand)`
  color: #e8e8e8;
  height: 2.5em;
  width: 2.5em;
  position: relative;
  left: 90%;
  bottom: 90%;
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
    border: "0.5px solid #ddd",
    width: "30vw",
    height: "50vh",
  },
}));

const Images = ({productStyles, currentImageSet}) => {
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
      setCurrentMainImage(productStyles.results[0].photos[0].thumbnail_url || 'https://images.unsplash.com/photo-1529088148495-2d9f231db829?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80')
      setCurrentImageStyleSet(productStyles.results[0].photos)
    } else {
      setCurrentMainImage(currentImageSet.photos[0].thumbnail_url || 'https://images.unsplash.com/photo-1529088148495-2d9f231db829?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80')
      setCurrentImageStyleSet(currentImageSet.photos);
    }
  },[currentImageSet])

  return(
    <ImageContainer>
      <PhotoExpand onClick = {handleOpen}/>
      <OverviewImage src = {currentMainImage} alt = 'cloth-image' />
      <Modal open = {open} onClose = {handleClose}>
        <div style = {modalStyle} className = {classes.paper}>
          <img className = {classes.fullSize} src = {currentMainImage} />
        </div>
      </Modal>
      <MiniImagesContainer className = 'mini-images'>
        {currentImageStyleSet.map((styleimage, index) => (
          <MiniImageStyle
            key = {index}
            src = {styleimage.thumbnail_url}
            alt = 'style mini thumbnails'
            onClick = {() => handleMiniImageClick(styleimage.thumbnail_url || 'https://images.unsplash.com/photo-1529088148495-2d9f231db829?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1100&q=80')}
          />
        ))}
      </MiniImagesContainer>
    </ImageContainer>
  )
};

export default Images;