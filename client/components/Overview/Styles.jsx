import React from 'react';
import styled from 'styled-components';

const StylesContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction:row;
`;

const StylesImage = styled.img`
  border-radius: 50px;
  height: 4em;
  width: 4em;
`;

const Styles = ({currentProductStyles, changeMainPicture, currentImageSet}) => {

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
    </StylesContainer>
  )
};

export default Styles;