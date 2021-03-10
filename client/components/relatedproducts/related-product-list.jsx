import React, {useState, useEffect} from 'react';
import RelatedProductCard from './related-product-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import api from '../../../api.js';

const RelatedList =  ({product_id, renderNewProductId}) => {
  //array of productIDs based off the productID state
  const [relatedItems, setRelatedItems] = useState([]);
  //array of objects in accordance to the relatedItems
  const [relatedItemsData, setRelatedItemsData] = useState([]);
  const[relatedItemsStyles, setRelatedItemsStyles] = useState([]);
  const [productReview, updateReview] = useState(null);

  useEffect(() => {
    relatedIdFunction();
  }, [product_id])

  const relatedIdFunction = async () => {
    await api.getRelatedProductIds(product_id)
      .then(res => {
        const distinctRelatedItems = [...new Set(res.data)]
          return distinctRelatedItems
      })
      .then(res => setRelatedItems(res))
      .catch(err => console.log ('error retrieving the relevant product ids', err))
  };

  useEffect(() => {
    generateRelatedItems(relatedItems);
  }, [relatedItems])

  const generateRelatedItems = async (relatedItems) => {
    let renderedItems = [];
    let promiseChain = Promise.resolve();

    relatedItems.forEach(item => {
      promiseChain = promiseChain
        .then(() => api.getProduct(item))
        .catch(err => console.log('error retrieving the product information', err))
        .then(res => renderedItems.push(res.data))
        .then(() => api.getMetadata({product_id: item}))
        .then(res => renderedItems[renderedItems.length - 1]['ratings'] = res.data.ratings)
        .then(() => api.getProductStyles(item))
        .then(res => {
          setRelatedItemsStyles(res.data)
          renderedItems[renderedItems.length - 1]['image'] = res.data.results[0].photos[0].thumbnail_url

          if (renderedItems.length === relatedItems.length) {
             setRelatedItemsData(renderedItems)
          }
        })
        .catch(err => console.log('error retrieving the product styles', err))
    })
  };

   //if you click on the card, that productid should be imported into the api request for that product info
  const sendProductId = (id) => {
    renderNewProductId(id);
  };

  return (
    <div className = 'product-list'>
      <h1 className = 'heading-list'>RELATED PRODUCTS</h1>
      <CarouselProvider
        className = 'items-carousel'
        naturalSlideHeight = {200}
        naturalSlideWidth = {200}
        totalSlides = {relatedItems.length}
        visibleSlides = {3}
        dragEnabled = {false}
        style = {{
          position:'relative',
          width: '70%',
          height: 'auto',
        }}
      >
      <div className = 'buttons'>
        <ButtonBack className = 'button-back'><i className="fas fa-arrow-left"></i></ButtonBack>
        <ButtonNext className = 'button-next'><i className="fas fa-arrow-right"></i></ButtonNext>
      </div>
      <Slider className = 'carousel__slider'>
        {relatedItemsData.map((relatedItem) => (
          <Slide
            key = {relatedItem.id}
            index = {Math.random()}
            style = {{
              width: '225px',
              height: '160px',
              border: '2px solid',
              marginRight: '25px',
              position: 'relative'
            }}
          >
            <RelatedProductCard
              key = {relatedItem.id}
              id = {relatedItem.id}
              image = {relatedItem.image}
              name = {relatedItem.name}
              category = {relatedItem.category}
              price = {relatedItem.default_price}
              starRating = {relatedItem.ratings}
              sendProductId = {sendProductId}
              // this information is for the modal
              currentProductId = {product_id}
              relatedItemsStyles = {relatedItemsStyles}
              features = {relatedItem.features}
            />
          </Slide>
        ))}
      </Slider>
      </CarouselProvider>
    </div>
  )
};

export default RelatedList;