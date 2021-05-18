import React, {useState, useEffect} from 'react';
import api from '../../../api.js';

const Overview = ({product_id}) => {
  const [currentProduct, setCurrentProduct] = useState({});

  //get current product info
  useEffect(() => {
    api.getProduct(product_id)
      .then(res => setCurrentProduct(res.data))
      .catch(err => console.error('Cannot retrieve Product Info', err))
  }, [])

  return(
    <section className = 'overview-section'>

    </section>
  )
};

export default Overview;
