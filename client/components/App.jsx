import React from "react";
import RelatedList from "./relatedproducts/related-product-list.jsx";
import YourOutfitList from "./relatedproducts/your-outfit-list.jsx";
import Questions from "./Questions/Questions.jsx";
import Reviews from "./Reviews/reviews.jsx";
import Overview from "./Overview/Overview.jsx";

class App extends React.Component {
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
        <div className = 'overview-flexbox'>
          <Overview product_id={this.state.product_id} />
        </div>
        <div className = 'component-flexbox'>
          <RelatedList
            product_id={this.state.product_id}
            renderNewProductId={this.renderNewProductId.bind(this)}
          />
          <YourOutfitList product_id={this.state.product_id} />
        </div>
        <Questions product_id={this.state.product_id} />
        <Reviews product_id={this.state.product_id} />
        <div style={{ marginBottom: "200px" }}></div>
      </>
    );
  }
}

export default App;
