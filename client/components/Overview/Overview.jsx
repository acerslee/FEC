import React, {useState, useEffect} from 'react';
import Images from './Images.jsx';
import Styles from './Styles.jsx';
import api from '../../../api.js';

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

  return(
    <section className = 'overview-section'>
      {Object.keys(currentProductStyles).length &&
        <>
          <Images currentProductStyles = {currentProductStyles} />
          <Styles currentProductStyles = {currentProductStyles} />
        </>
      }
    </section>
  )
};

export default Overview;
