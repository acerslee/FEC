import React, { Component } from "react";
import RelatedList from "./relatedproducts/related-product-list.jsx";
import YourOutfitList from "./relatedproducts/your-outfit-list.jsx";
import Questions from "./Questions/Questions.jsx";
import Reviews from "./Reviews/reviews.jsx";
import Overview from "./Overview/Overview.jsx";
import styled from 'styled-components';

const Header = styled.div`
  background-color: green;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {
      product_id: 24156,
    }
  }

  renderNewProductId(id) {
    this.setState({
      product_id: id,
    });
  }

  render() {
    return (
      <>
        <Header style = {{marginTop: '0'}}>
          <h1>Catwalk</h1>
        </Header>
        <Overview product_id={this.state.product_id} />
        <div className = 'component-flexbox'>
          <RelatedList
            product_id={this.state.product_id}
            renderNewProductId={this.renderNewProductId.bind(this)}
          />
          <YourOutfitList product_id={this.state.product_id} />
        </div>
        {/* <Questions product_id={this.state.product_id} />
        <Reviews product_id={this.state.product_id} /> */}
      </>
    );
  }
}

export default App;