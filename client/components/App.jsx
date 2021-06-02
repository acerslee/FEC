import React, { useState } from "react";
import Header from './Header.jsx';
import RelatedList from "./relatedproducts/related-product-list.jsx";
import YourOutfitList from "./relatedproducts/your-outfit-list.jsx";
import Questions from "./Questions/Questions.jsx";
import Reviews from "./Reviews/reviews.jsx";
import Overview from "./Overview/Overview.jsx";

const App = () => {

  const [product_id, setProduct_id] = useState(24156);
  const [currentProduct, setCurrentProduct] = useState({});

  const renderNewProductId = (id) => {
    setProduct_id(id);
  }

  return (
    <>
      <Header />
      <Overview product_id={product_id} />
      <RelatedList
        product_id={product_id}
        renderNewProductId={renderNewProductId}
      />
      <YourOutfitList product_id={product_id} />
      <Questions product_id={product_id} />
      <Reviews product_id={product_id} />
    </>
  );
};

export default App;