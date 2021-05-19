import React from 'react';
import styled from 'styled-components';

const StylesContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StylesImage = styled.img`
  border-radius: 50px;
  height: 4em;
  width: 4em;
`;

const Styles = ({currentProductStyles, changeMainPicture}) => {
  return(
    <StylesContainer>
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
    </StylesContainer>
  )
};

export default Styles;