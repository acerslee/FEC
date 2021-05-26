import React, { useState } from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { FaStar } from 'react-icons/fa';

const StylesContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
`;

const ListAndButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const StylesImage = styled.img`
  border-radius: 50px;
  margin: 0.5rem;
  height: 4em;
  width: 4em;
`;

const Styles = ({currentProduct, currentProductStyles, changeMainPicture, currentImageSet}) => {

  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = event => {
    setSize(event.target.value)
  };

  const handleQuantityChange = event => {
    setQuantity(event.target.value)
  };

  let productStyle;
  if (!Object.keys(currentImageSet).length) productStyle = currentProductStyles.results[0].name;
  else productStyle = currentImageSet.name;

  return(
    <StylesContainer>
      <h2>{currentProduct.category}</h2>
      <h1>{currentProduct.name}</h1>
      <p>{currentProduct.default_price}</p>
      <p>{productStyle}</p>
      <ImageContainer>
        {currentProductStyles.results.map(style => {
          return(
            <StylesImage
              key = {style.style_id}
              src = {style.photos[0].thumbnail_url}
              alt = 'style-photo'
              onClick = {() => changeMainPicture(style.style_id)}
            />
          )
        })}
      </ImageContainer>
      <ListAndButtonsContainer>
      <FormControl>
        <InputLabel>Select Size</InputLabel>
        <Select
          labelId = 'size-selected-label'
          value = {size}
          onChange = {handleSizeChange}
        >
          <MenuItem value = ''>Select Size</MenuItem>
          <MenuItem value = {'XS'}>Extra Small</MenuItem>
          <MenuItem value = {'S'}>Small</MenuItem>
          <MenuItem value = {'M'}>Medium</MenuItem>
          <MenuItem value = {'L'}>Large</MenuItem>
          <MenuItem value = {'XL'}>Extra Large</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>Select Quantity</InputLabel>
        <Select
            labelId = 'size-selected-label'
            value = {quantity}
            onChange = {handleQuantityChange}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
      <Button variant = 'contained'>Add To Bag</Button>
      <Button variant = 'contained'>
        <FaStar  style = {{width: 'auto'}} />
      </Button>
      </ListAndButtonsContainer>
    </StylesContainer>
  )
};

export default Styles;