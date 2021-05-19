import React from 'react';
import styled from 'styled-components';

const BottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-around;
`;

const SloganAndDescription = styled.div`
  border-right: 2px solid;
  width: 60%;
`;

const Features = styled.div`
  width: 40%;
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
          <p key = {index}>{feature.feature} : {feature.value}</p>
        ))}
      </Features>
    </BottomContainer>
  )
};

export default BottomSection;