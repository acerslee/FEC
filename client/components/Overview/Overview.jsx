import React, { useState } from 'react';
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

const Overview = ({product_id, currentProduct, productMetadata, productStyles}) => {
  const [currentProductStyles, setCurrentProductStyles] = useState(productStyles);
  const [currentImageSet, setCurrentImageSet] = useState(productStyles.results[0]);
  const [currentStylePrice, setCurrentStylePrice] = useState({
    original_price: productStyles.results[0].original_price,
    sale_price: productStyles.results[0].sale_price
  });

  const changeStyleDetail = style_id => {
    for (let i = 0; i < productStyles.results.length; i++) {
      if (productStyles.results[i].style_id === style_id){
        setCurrentImageSet(productStyles.results[i])
        setCurrentStylePrice({
          ...currentStylePrice,
          original_price: productStyles.results[i].original_price,
          sale_price: productStyles.results[i].sale_price,
        })
      }
    }
  };

  return(
    <OverviewContainer>
      <ImageStyleContainer>
        <Images
          currentProductStyles = {productStyles}
          currentImageSet = {currentImageSet}
        />
        <Styles
          currentProduct = {currentProduct}
          currentStarRating = {productMetadata.ratings}
          currentStylePrice = {currentStylePrice}
          currentProductStyles = {productStyles}
          changeStyleDetail = {changeStyleDetail}
          currentImageSet = {currentImageSet}
        />
      </ImageStyleContainer>
      <BottomSection currentProduct = {currentProduct} />
    </OverviewContainer>
  )
};

export default Overview;