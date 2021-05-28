import React from 'react';
import styled from 'styled-components';
import { FaCheck } from 'react-icons/fa';

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SloganAndDescription = styled.div`
  border-right: 3px solid;
  padding-right: 2em;
`;

const Features = styled.div`
  margin-left: 1em;
  padding-left: 2em;
`;

const BottomSection = ({currentProduct}) => {
  return(
    <BottomContainer>
      <SloganAndDescription>
        <h2>{currentProduct.slogan}</h2>
        <p>{currentProduct.description}</p>
      </SloganAndDescription>
      <Features>
        {currentProduct.features.map((feature, index) => (
          <p key = {index}><FaCheck /> {feature.feature} : {feature.value}</p>
        ))}
      </Features>
    </BottomContainer>
  )
};

export default BottomSection;