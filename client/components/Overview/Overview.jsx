import React, {useState, useEffect} from 'react';
import Images from './Images.jsx';
import Styles from './Styles.jsx';
import BottomSection from './BottomSection.jsx';
import api from '../../../api.js';
import styled from 'styled-components';

const OverviewContainer = styled.section`
  display: flex;
  flex-direction: column;
  height: 50%;
`;

const ImageStyleContainer = styled.div`
  display: flex;
  flex-direction:row;
  justify-content: center;
  height: 55%;
`;

const Overview = ({product_id}) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentProductStyles, setCurrentProductStyles] = useState({});
  const [currentImageSet, setCurrentImageSet] = useState({});

  //get current product info & its styles
  useEffect(() => {
    api.getProduct(product_id)
      .then(product => setCurrentProduct(product.data))
      .then(() => {
        return api.getProductStyles(product_id)
      })
      .then(styles => setCurrentProductStyles(styles.data))
      .catch(err => console.error('Cannot retrieve Product Info', err))
  }, [product_id]);

  const changeMainPicture = (style_id) => {
    // console.log(style_id)
    // console.log(currentProductStyles.results);
    for (let i = 0; i < currentProductStyles.results.length; i++) {
      if (currentProductStyles.results[i].style_id === style_id){
        setCurrentImageSet(currentProductStyles.results[i])
      }
    }
  };

  // console.log(currentProduct);
  // console.log('style', currentProductStyles);
  return(
    <OverviewContainer>
      {Object.keys(currentProductStyles).length &&
        <>
          <ImageStyleContainer>
            <Images
              currentProductStyles = {currentProductStyles}
              currentImageSet = {currentImageSet}
            />
            <Styles
              currentProduct = {currentProduct}
              currentProductStyles = {currentProductStyles}
              changeMainPicture = {changeMainPicture}
              currentImageSet = {currentImageSet}
            />
          </ImageStyleContainer>
          <BottomSection currentProduct = {currentProduct} />
        </>
      }
    </OverviewContainer>
  )
};

export default Overview;
