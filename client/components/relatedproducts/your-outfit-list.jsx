import React, {useState, useEffect} from 'react';
import useLocalStorageState from 'use-local-storage-state';
import OutfitCard from './your-outfit-card.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const YourOutfitList = ({product_id, currentProduct, productMetadata, productStyles}) => {
  const [storageOutfitItems, setStorageOutfitItems] = useLocalStorageState('outfitItems', [])
  const [outfitItems, setOutfitItems] = useState(storageOutfitItems)
  //initialize outfit list array accordingly to the local storage data
  useEffect (() => setStorageOutfitItems(outfitItems),[]);

  //edit the localstorage array if the outfit list changes
  useEffect (() => setStorageOutfitItems(outfitItems),[outfitItems]);

  const getProductFunction = () => {
    let productData = currentProduct;
    productData['ratings'] = productMetadata.ratings;
    productData['image'] = productStyles.results[0].photos[0].thumbnail_url;

    setOutfitItems([...outfitItems, productData])
  };

  const addNewOutfitClick = (productId) => {
    let productFound = false;
    for (let i = 0; i < outfitItems.length; i++) {
      if (product_id === outfitItems[i].id) {
        productFound = true;
      }
    }
    if (!productFound) {
      getProductFunction()
    } else return;
  };

  const removeListItem = (id) => {
    let filteredItems = outfitItems.filter(outfitItem => outfitItem.id !== id);
    setOutfitItems(filteredItems);
  };

  return(
    <div className = 'product-list'>
      <h1 className = 'heading-list'>YOUR OUTFITS</h1>
      <CarouselProvider
        className = 'items-carousel'
        naturalSlideHeight = {150}
        naturalSlideWidth = {150}
        totalSlides = {outfitItems.length + 1}
        visibleSlides = {3}
        dragEnabled = {false}
      >
        <Slider className = 'carousel__slider' role = 'list'>
           <Slide
              index = {0}
              role = 'listitem'
              style = {{
                width: '16rem',
                height: '26rem',
                border: '1px solid',
                marginRight: '3rem',
                position: 'relative',
                zIndex: '2'
              }}
            >
              <div
                data-testid="addition-card"
                className = 'product-card add-card'
                onClick = {() => addNewOutfitClick(product_id)}
              >
                <FaPlus size = {55}
                   style = {{
                     display: 'block',
                  }}
                />
                <p className = 'plus-card-caption'>Add to Outfit</p>
              </div>
          </Slide>
          {outfitItems.map(outfitItem => (
            <Slide
              key = {outfitItem.id}
              role = 'listitem'
              index = {Math.random()}
              style = {{
                width: '16rem',
                height: '26rem',
                border: '1px solid',
                marginRight: '3rem',
                position: 'relative'
              }}
            >
            <OutfitCard
              key = {outfitItem.id}
              id = {outfitItem.id}
              image = {outfitItem.image}
              name = {outfitItem.name}
              category = {outfitItem.category}
              price = {outfitItem.default_price}
              rating = {outfitItem.ratings}
              removeListItem = {removeListItem}
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

export default YourOutfitList;