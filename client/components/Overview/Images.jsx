import React, {useState, useEffect} from 'react';

const Images = ({currentProductStyles, currentImageSet}) => {
  // console.log('styles', currentProductStyles)
  console.log('currentimage', currentImageSet);

  const [currentMainImage, setCurrentMainImage] = useState('');
  const [currentMiniImages, setCurrentMiniImages] = useState();

  useEffect(() => {
    setCurrentMainImage(currentProductStyles.results[0].photos[0].thumbnail_url)
  },[currentProductStyles])


  let currentImage;
  if (Object.keys(currentImageSet).length) currentImage = currentImageSet[0].thumbnail_url;
  else currentImage = currentMainImage;

  return(
    <div className = 'images'>
      <img src = {currentImage} alt = 'cloth-image' />
    </div>
  )
};

export default Images;