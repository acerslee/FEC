import React, {useState, useEffect} from 'react';

const Images = ({currentProductStyles}) => {
  console.log('styles', currentProductStyles)

  const [currentImage, setCurrentImage] = useState('');
  const [currentMiniImages, setCurrentMiniImages] = useState();

  useEffect(() => {
    console.log(currentProductStyles.results)
    setCurrentImage(currentProductStyles.results[0].photos[0].thumbnail_url)
  },[])



  return(
    <div className = 'images'>
      {Object.keys(currentProductStyles).length &&
        <img src = {currentImage} alt = 'cloth-image' />
      }
    </div>
  )
};

export default Images;