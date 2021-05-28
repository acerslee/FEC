import React, {useState, useEffect} from 'react';
import {StarFill} from 'react-bootstrap-icons';
import Modal from 'react-modal';
import ModalDetails from './modalDetails.jsx';
import api from '../../../api.js';
import {StaticRating} from '../../starRating.jsx';
import regeneratorRuntime from 'regenerator-runtime';

const RelatedProductCard = ({id, currentProductId, relatedItemsStyles, name, category, image, price, sendProductId, features, starRating}) => {

  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currentProductStyles, setCurrentProductStyles] = useState([]);

  Modal.setAppElement('body');

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  const getCurrentProductInfo = async(currentProductId) => {
    await api.getProduct(currentProductId)
      .then(res => setCurrentProduct(res.data))
      .then(() => api.getProductStyles(currentProductId))
      .then(res => setCurrentProductStyles(res.data))
      .catch(err => console.log('error updating modal', err))
  };

  useEffect(() => {
    getCurrentProductInfo(currentProductId)
  },[currentProductId])

  // let uppercaseCategory;
  // if (category === undefined) {
  //   uppercaseCategory = category
  // } else uppercaseCategory = category.toUpperCase();

  return (
    <div className = 'product-card'>
      <StarFill
        size = {21}
        onClick = {toggleModal}
        style = {{
          position: 'absolute',
          left: '13.5em',
          top: '1.5em',
          color: '#e8e8e8'
        }}
      />
      <img className = 'product-image' src = {image} alt = {name} loading = 'lazy'/>
      <div className = 'bottom-half-card' onClick = {() => sendProductId(id)}>
        <p className = 'product-category'>{category.toUpperCase()}</p>
        <p className = 'product-name'>{name}</p>
        <p className = 'product-price'>${price}</p>
        <div className = 'product-rating'><StaticRating data = {starRating} /></div>
      </div>

      <Modal
        isOpen = {openModal}
        onRequestClose = {toggleModal}
        className = 'mymodal'
        overlayClassName = 'myoverlay'
      >
      <ModalDetails
        currentProduct = {currentProduct}
        currentProductStyles = {currentProductStyles}
        relatedItemsStyles = {relatedItemsStyles}
        name = {name}
        currentProductId = {currentProductId}
        category = {category}
        price = {price}
        features = {features}
      />
      </Modal>
    </div>
  )
};

export default RelatedProductCard;