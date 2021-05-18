import React, {useState, useEffect} from 'react';

const Images = ({currentProductStyles}) => {
  // console.log('styles', currentProductStyles)

  const [currentImage, setCurrentImage] = useState('');
  const [currentMiniImages, setCurrentMiniImages] = useState();

  useEffect(() => {
    setCurrentImage(currentProductStyles.results[0].photos[0].thumbnail_url)
  },[currentProductStyles])

  return(
    <div className = 'images'>
      <img src = {currentImage} alt = 'cloth-image' />
    </div>
  )
};

export default Images;