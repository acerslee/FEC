import React, { Component } from "react";
import Header from './Header.jsx';
import RelatedList from "./relatedproducts/related-product-list.jsx";
import YourOutfitList from "./relatedproducts/your-outfit-list.jsx";
import Questions from "./Questions/Questions.jsx";
import Reviews from "./Reviews/reviews.jsx";
import Overview from "./Overview/Overview.jsx";

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
        <Header />
        <Overview product_id={this.state.product_id} />
        <RelatedList
          product_id={this.state.product_id}
          renderNewProductId={this.renderNewProductId.bind(this)}
        />
        <YourOutfitList product_id={this.state.product_id} />
        <Questions product_id={this.state.product_id} />
        <Reviews product_id={this.state.product_id} />
      </>
    );
  }
}

export default App;