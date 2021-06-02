import React, {useState, useEffect} from 'react';
import Images from './Images.jsx';
import Styles from './Styles.jsx';
import BottomSection from './BottomSection.jsx';
import styled from 'styled-components';
import axios from 'axios';

const OverviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 50%;
  width: 100%;
`;

const ImageStyleContainer = styled.div`
  display: flex;
  flex-direction:row;
  justify-content: center;
  height: 55%;
`;

const Overview = ({product_id, currentProduct, productMetadata}) => {
  console.log(productMetadata)
  const [currentProductStyles, setCurrentProductStyles] = useState({});
  const [currentImageSet, setCurrentImageSet] = useState({});
  const [currentStarRating, setCurrentStarRating] = useState(productMetadata.ratings);
  const [currentStylePrice, setCurrentStylePrice] = useState({});

  //get current product info & its styles
  useEffect(() => {
    const styleUrl = `/proxy/api/fec2/hratx/products/${product_id}/styles`;
    // const metaUrl = `/proxy/api/fec2/hratx/reviews/meta/?product_id=${product_id}`;

    // axios.get(metaUrl)
    //   .then(res => setCurrentStarRating(res.data.ratings))
    axios.get(styleUrl)
      .then(styles => {
        setCurrentImageSet(styles.data.results[0])
        setCurrentProductStyles(styles.data)
        setCurrentStylePrice({
          ...currentStylePrice,
          original_price: styles.data.results[0].original_price,
          sale_price: styles.data.results[0].sale_price
        })
      })
      .catch(err => console.error('Cannot retrieve Product Info', err))
  }, [product_id]);

  const changeStyleDetail = style_id => {
    for (let i = 0; i < currentProductStyles.results.length; i++) {
      if (currentProductStyles.results[i].style_id === style_id){
        setCurrentImageSet(currentProductStyles.results[i])
        setCurrentStylePrice({
          ...currentStylePrice,
          original_price: currentProductStyles.results[i].original_price,
          sale_price: currentProductStyles.results[i].sale_price,
        })
      }
    }
  };

  return(
    <>
      {Object.keys(currentProductStyles).length !== 0 &&
        <OverviewContainer>
          <ImageStyleContainer>
            <Images
              currentProductStyles = {currentProductStyles}
              currentImageSet = {currentImageSet}
            />
            <Styles
              currentProduct = {currentProduct}
              currentStarRating = {currentStarRating}
              currentStylePrice = {currentStylePrice}
              currentProductStyles = {currentProductStyles}
              changeStyleDetail = {changeStyleDetail}
              currentImageSet = {currentImageSet}
            />
          </ImageStyleContainer>
          <BottomSection currentProduct = {currentProduct} />
        </OverviewContainer>
      }
    </>
  )
};

export default Overview;