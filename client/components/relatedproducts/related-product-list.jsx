import React, {useState, useEffect} from 'react';
import RelatedProductCard from './related-product-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import axios from 'axios';
import {getReviewInfo} from '../Overview/serverRequests.js';
import {StaticRating} from '../../starRating.jsx';

const RelatedList = ({product_id, renderNewProductId}) => {
  //this will be an array of productIDs based off the productID state
  const [relatedItems, setRelatedItems] = useState([]);
  //this will generate an array of objects in accordance to the relatedItems
  const [relatedItemsData, setRelatedItemsData] = useState([]);
  const [productReview, updateReview] = useState(null);

  useEffect(() => {
    const url = `/proxy/api/fec2/hratx/products/${product_id}/related`;
    axios.get(url)
      .then(res => {
        const distinctRelatedItems = [...new Set(res.data)]
        return distinctRelatedItems
      })
      .then (res => setRelatedItems(res))
      .catch(err => console.log('error retrieving the relevant product ids', err))
  }, [product_id])

  //do useEffect again to pull all the data in accordance to the relatedItems array populated from the first useEffect
  useEffect(() => {
    let renderedItems = [];
    let renderedStyles = [];

    relatedItems.forEach(item => {
      const productUrl = `/proxy/api/fec2/hratx/products/${item}`;
      const stylesUrl = `/proxy/api/fec2/hratx/products/${item}/styles`;
      axios.get(productUrl)
        .then(res => {
          //paste in product.id within function
          // getReviewInfo(21111, (err, data) => {
          //   if (err) {
          //     throw err
          //   } else {
          //     updateReview(data)
          //   }
          // })
          renderedItems.push(res.data);
        })
        .then(() => {
          axios.get(stylesUrl)
            .then(res => {
              renderedStyles.push({id: res.data.product_id, image:res.data.results[0].photos[0].thumbnail_url})
              if (renderedItems.length === renderedStyles.length) {
                for (let i = 0; i < renderedItems.length; i++) {
                  for (let j = 0; j < renderedStyles.length; j++){
                    if (renderedItems[i].id == renderedStyles[j].id) {
                      renderedItems[i]['image'] = renderedStyles[j].image
                    }
                  }
                }
                let checkImageProperty = renderedItems.some(obj => obj.image);
                  if (checkImageProperty) {
                    setRelatedItemsData(renderedItems)
                  }
              }
            })
            .catch(err => console.log('error retrieving the product styles', err))
        })
        .catch(err => console.log('error retrieving the product information', err));
    })
  },[relatedItems])

   //if you click on the card, that productid should be imported into the api request for that product info
  const sendProductId = (id) => {
    console.log('id', id)
    renderNewProductId(id);
  };

  return (
    <div className = 'related-list'>
      <h1 className = 'heading-list'>RELATED PRODUCTS</h1>
      <CarouselProvider
        className = 'items-carousel'
        naturalSlideHeight = {150}
        naturalSlideWidth = {125}
        totalSlides = {relatedItems.length}
        visibleSlides = {3}
        dragEnabled = {false}
        style = {{
          position:'absolute'
        }}
      >
      <div className = 'buttons'>
        <ButtonBack className = 'button-back'><i className="fas fa-arrow-left"></i></ButtonBack>
        <ButtonNext className = 'button-next'><i className="fas fa-arrow-right"></i></ButtonNext>
      </div>
      <div className = 'carousel__container'>
      <Slider className = 'carousel__slider'>
        {relatedItemsData.map((relatedItem) => (
          <Slide
            key = {relatedItem.id}
            index = {0}
            style = {{
              width: '240px',
              height: '120px',
              border: '2px solid',
              marginLeft:'20px',
              marginRight: '20px',
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
              // starRating = {StaticRating(productReview)}

              //pass in productReview value into StaticRating
              sendProductId = {sendProductId}

              // // this information is for the modal
              currentProductId = {product_id}
              features = {relatedItem.features}
            />
          </Slide>
        ))}
      </Slider>
      </div>
      </CarouselProvider>
    </div>
  )
};

export default RelatedList;