import React, {useState, useEffect} from 'react';
import styled from 'styled-components';


const OverviewImage = styled.img`
  height: 40rem;
  width: 40rem;
`;


const Images = ({currentProductStyles, currentImageSet}) => {
  // console.log('styles', currentProductStyles)
  // console.log('currentimage', currentImageSet);

  const [currentMainImage, setCurrentMainImage] = useState('');
  const [styleDescription, setStyleDescription] = useState('');
  // const [currentMiniImages, setCurrentMiniImages] = useState();

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
      <OverviewImage src = {currentImage} alt = 'cloth-image' />
    </div>
  )
};

export default Images;