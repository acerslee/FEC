import React, {useState, useEffect} from 'react';
import Images from './Images.jsx';
import Styles from './Styles.jsx';
import api from '../../../api.js';
import styled from 'styled-components';


const OverviewContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageOverviewContainer = styled.div`

`;

const RightSideOverview = styled.div`

`;

const BottomContainer = styled.div`

`;

const Overview = ({product_id}) => {
  const [currentProduct, setCurrentProduct] = useState({});
  const [currentProductStyles, setCurrentProductStyles] = useState({});

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

  console.log(currentProduct);
  return(
    <>
      <OverviewContainer>
        {Object.keys(currentProductStyles).length &&
          <>
            <ImageOverviewContainer>
              <Images currentProductStyles = {currentProductStyles} />
            </ImageOverviewContainer>
            <RightSideOverview>
              <p>{currentProduct.category}</p>
              <h1>{currentProduct.name}</h1>
              <p>{currentProduct.default_price}</p>
              <Styles currentProductStyles = {currentProductStyles} />
            </RightSideOverview>
          </>
        }
      </OverviewContainer>
      {Object.keys(currentProduct).length &&
        <BottomContainer>
          <h2>{currentProduct.slogan}</h2>
          <p>{currentProduct.description}</p>
        </BottomContainer>
      }
    </>
  )
};

export default Overview;
