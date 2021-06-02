import React, {useState, useEffect} from 'react';
import {StarFill} from 'react-bootstrap-icons';
import Modal from 'react-modal';
import ModalDetails from './modalDetails.jsx';
import {StaticRating} from '../../starRating.jsx';
import regeneratorRuntime from 'regenerator-runtime';
import axios from 'axios';

const RelatedProductCard = ({id, currentProductId, relatedItemsStyles, name, category, image, price, sendProductId, features, starRating}) => {

  const [openModal, setOpenModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState([]);
  const [currentProductStyles, setCurrentProductStyles] = useState([]);

  Modal.setAppElement('body');

  const toggleModal = () => {
    setOpenModal(!openModal);
  }

  useEffect(() => {
    const productUrl = `/proxy/api/fec2/hratx/products/${currentProductId}`;
    const styleUrl = `/proxy/api/fec2/hratx/products/${currentProductId}/styles`;

    axios.get(productUrl)
      .then(res => setCurrentProduct(res.data))
      .then(() => axios.get(styleUrl))
      .then(res => setCurrentProductStyles(res.data))
      .catch(err => console.error('error updating modal', err))

  },[currentProductId])

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