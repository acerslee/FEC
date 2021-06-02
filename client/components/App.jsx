import React, { useState, useEffect } from "react";
import Header from './Header.jsx';
import RelatedList from "./relatedproducts/related-product-list.jsx";
import YourOutfitList from "./relatedproducts/your-outfit-list.jsx";
import Questions from "./Questions/Questions.jsx";
import Reviews from "./Reviews/reviews.jsx";
import Overview from "./Overview/Overview.jsx";
import axios from 'axios';

const App = () => {

  const [product_id, setProduct_id] = useState(24156);
  const [currentProduct, setCurrentProduct] = useState({});
  const [productMetadata, setProductMetadata] = useState({});

  const renderNewProductId = (id) => {
    setProduct_id(id);
  }

  useEffect(() => {
    const productUrl = `/proxy/api/fec2/hratx/products/${product_id}`;
    const metaUrl = `/proxy/api/fec2/hratx/reviews/meta/?product_id=${product_id}`;

    axios.all([
      axios.get(productUrl),
      axios.get(metaUrl)
    ])
    .then(responses => {
      console.log(responses)
      setCurrentProduct(responses[0].data)
      setProductMetadata(responses[1].data)
    })
    .catch(err => console.error('Cannot retrieve product data'))

  },[product_id])

  return (
    <>
    {Object.keys(productMetadata).length !== 0 &&
      <>
        <Header />
        <Overview
          product_id={product_id}
          currentProduct = {currentProduct}
          productMetadata = {productMetadata}
        />
        <RelatedList
          product_id={product_id}
          renderNewProductId={renderNewProductId}
          currentProduct = {currentProduct}
        />
        <YourOutfitList
          product_id={product_id}
          currentProduct = {currentProduct}
        />
        <Questions
          product_id={product_id}
          currentProduct = {currentProduct}
        />
        <Reviews
          product_id={product_id}
          currentProduct = {currentProduct}
          productMetadata = {productMetadata}
        />
      </>
      }
    </>
  );
};

export default App;