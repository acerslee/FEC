import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  width: 92%;
  margin-top: -0.5rem;
  background-color: #7a7a7a;
  height: 10vh;
`;

const Header = () => (
  <>
    <HeaderContainer>
      Emu Store
    </HeaderContainer>
    <p><em>SITE-WIDE ANNOUNCEMENT MESSAGE!</em> -- SALE / <strong>DISCOUNT OFFER</strong> -- NEW PRODUCT HIGHLIGHT</p>
  </>
);

export default Header;