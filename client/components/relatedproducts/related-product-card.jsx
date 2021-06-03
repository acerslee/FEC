import React, {useState, useEffect} from 'react';
import { FaStar } from 'react-icons/fa';
import Modal from 'react-modal';
import ModalDetails from './modalDetails.jsx';
import {StaticRating} from '../../starRating.jsx';
// import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';

const RelatedProductCard = ({id, currentProduct, relatedItemsStyles, name, category, image, price, sendProductId, features, starRating, productStyles}) => {

  const [openModal, setOpenModal] = useState(false);

  Modal.setAppElement('body');

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  return (
    <div className = 'product-card'>
      <FaStar
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
        <p className = 'product-category' style = {{textTransform: 'uppercase'}}>{category}</p>
        <p className = 'product-name'>{name}</p>
        <p className = 'product-price'>${price}</p>
        <StaticRating data = {starRating} />
      </div>

      <Modal
        isOpen = {openModal}
        onRequestClose = {toggleModal}
        className = 'mymodal'
        overlayClassName = 'myoverlay'
      >
      <ModalDetails
        currentProduct = {currentProduct}
        currentProductStyles = {productStyles}
        relatedItemsStyles = {relatedItemsStyles}
        name = {name}
        category = {category}
        price = {price}
        features = {features}
      />
      </Modal>
    </div>
  )
};

export default RelatedProductCard;