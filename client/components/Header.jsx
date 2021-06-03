import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 80%;
  margin-top: -0.5rem;
  background-color: #7a7a7a;
  height: 6rem;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  color: white;
  margin-left: 0.5em;
  font-style: italic;
`;

const Header = () => (
  <>
    <HeaderContainer>
      <Logo>Catwalk</Logo>
    </HeaderContainer>
    <p><em>SITE-WIDE ANNOUNCEMENT MESSAGE!</em> -- SALE / <strong>DISCOUNT OFFER</strong> -- NEW PRODUCT HIGHLIGHT</p>
  </>
);

export default Header;