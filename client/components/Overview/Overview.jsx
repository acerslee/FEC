import React, { useState, useEffect } from 'react';
import Images from './Images.jsx';
import Styles from './Styles.jsx';
import BottomSection from './BottomSection.jsx';
import styled from 'styled-components';

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
  const [currentImageSet, setCurrentImageSet] = useState({});
  const [currentStylePrice, setCurrentStylePrice] = useState({});

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

  //when a new item is clicked from the related products, this will update the default overview image and its details.
  useEffect(() => {
    setCurrentImageSet(productStyles.results[0]);
    setCurrentStylePrice({
      ...currentStylePrice,
      original_price: productStyles.results[0].original_price,
      sale_price: productStyles.results[0].sale_price
    })
  },[productStyles])

  return(
    <OverviewContainer>
      <ImageStyleContainer>
        <Images
          productStyles = {productStyles}
          currentImageSet = {currentImageSet}
        />
        <Styles
          currentProduct = {currentProduct}
          currentStarRating = {productMetadata.ratings}
          currentStylePrice = {currentStylePrice}
          productStyles = {productStyles}
          changeStyleDetail = {changeStyleDetail}
          currentImageSet = {currentImageSet}
        />
      </ImageStyleContainer>
      <BottomSection currentProduct = {currentProduct} />
    </OverviewContainer>
  )
};

export default Overview;