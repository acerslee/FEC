import React from 'react';
import {XCircle} from 'react-bootstrap-icons';
import {StaticRating} from '../../starRating.jsx';

const OutfitCard = props => (
  <div className = 'product-card'>
    <XCircle size = {23} onClick = {() => props.removeListItem(props.id)}
      style = {{
        position: 'absolute',
        left: '13.5em',
        top: '1.5em'
      }}
    />
    <img className = 'product-image' src = {props.image} alt = {props.name} loading = 'lazy'/>
    <div className = 'bottom-half-card'>
      <p className = 'product-category'>{props.category.toUpperCase()}</p>
      <p className = 'product-name'>{props.name}</p>
      <p className = 'product-price'>${props.price}</p>
      <StaticRating data = {props.rating} />
    </div>
  </div>
);

export default OutfitCard;