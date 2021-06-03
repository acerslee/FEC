import React, {useState, useEffect} from 'react';
import RelatedProductCard from './related-product-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

const RelatedList =  ({product_id, renderNewProductId, currentProduct, productStyles}) => {
  //array of productIDs based off the productID state
  const [relatedItems, setRelatedItems] = useState([]);
  //array of objects in accordance to the relatedItems
  const [relatedItemsData, setRelatedItemsData] = useState([]);
  const[relatedItemsStyles, setRelatedItemsStyles] = useState([]);

  useEffect(() => {
    const relatedIdUrl = `/proxy/api/fec2/hratx/products/${product_id}/related`;

    axios.get(relatedIdUrl)
      .then(res => {
          let distinctRelatedItems = [...new Set(res.data)]
          let removeDuplicateRender = distinctRelatedItems.filter(outfitId => outfitId !== product_id);
          return removeDuplicateRender;
      })
      .then(res => setRelatedItems(res))
      .catch(err => console.error('error retrieving the relevant product ids', err))
  }, [product_id])

  useEffect(() => {
    let renderedItems = [];

    relatedItems.forEach(item => {
      const productUrl = `/proxy/api/fec2/hratx/products/${item}`;
      const metaUrl = `/proxy/api/fec2/hratx/reviews/meta/?product_id=${item}`;
      const styleUrl = `/proxy/api/fec2/hratx/products/${item}/styles`;

      axios.all([
        axios.get(productUrl),
        axios.get(metaUrl),
        axios.get(styleUrl)
      ])
      .then(responses => {
        renderedItems.push(responses[0].data)
        renderedItems[renderedItems.length - 1]['ratings'] = responses[1].data.ratings;
        renderedItems[renderedItems.length - 1]['image'] = responses[2].data.results[0].photos[0].thumbnail_url
        setRelatedItemsStyles(responses[2].data)

        if (renderedItems.length === relatedItems.length) {
          setRelatedItemsData(renderedItems)
        }
      })
      .catch(err => console.error('Error retrieving producting info', err))
    })
  }, [relatedItems])

   //if you click on the card, that productid should be imported into the api request for that product info
  const sendProductId = (id) => {
    renderNewProductId(id);
  };

  return (
    <div className = 'product-list'>
      <h1 className = 'heading-list'>RELATED PRODUCTS</h1>
      <CarouselProvider
        className = 'items-carousel'
        naturalSlideHeight = {150}
        naturalSlideWidth = {150}
        totalSlides = {relatedItems.length}
        visibleSlides = {3}
        dragEnabled = {false}
      >

      <Slider className = 'carousel__slider' role = 'list'>
        {relatedItemsData.map(relatedItem => (
          <Slide
            key = {relatedItem.id}
            role = 'listitem'
            index = {Math.random()}
            style = {{
              width: '16em',
              height: '26em',
              border: '1px solid',
              marginRight: '3rem',
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
              productStyles = {productStyles}
              currentProduct = {currentProduct}
              currentProductId = {product_id}
              relatedItemsStyles = {relatedItemsStyles}
              features = {relatedItem.features}
            />
          </Slide>
        ))}
      </Slider>
      <div className = 'buttons'>
        <ButtonBack className = 'button-back' aria-label = 'scroll-back'><FaArrowLeft /></ButtonBack>
        <ButtonNext className = 'button-next' aria-label = 'scroll-next'><FaArrowRight /></ButtonNext>
      </div>
      </CarouselProvider>
    </div>
  )
};

export default RelatedList;