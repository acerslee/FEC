import React, {useState} from 'react';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const StylesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
`;

const StylesImage = styled.img`
  border-radius: 50px;
  margin: 0.5rem;
  height: 4em;
  width: 4em;
`;

const Styles = ({currentProductStyles, changeMainPicture, currentImageSet}) => {

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
    </StylesContainer>
  )
};

export default Styles;