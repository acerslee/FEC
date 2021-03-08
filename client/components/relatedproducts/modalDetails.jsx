import React, {useState, useEffect} from 'react';

const ModalDetails = (props) => {

  return(
    <div className = 'modal-container'>
      <h1 className = 'modal-heading'>COMPARING</h1>
      <table className = 'modal-comparison'>
        <tbody>
          <tr className = 'modal-names-row'>
            <th>{props.name}</th>
            <th></th>
            <th>{props.currentProduct.name}</th>
          </tr>
          <tr>
            <th>{props.category}</th>
            <th>Category</th>
            <th>{props.currentProduct.category}</th>
          </tr>
          <tr>
            <th>{props.price}</th>
            <th>Price</th>
            <th>{props.currentProduct.default_price}</th>
          </tr>
          <tr>
            <th>{props.features.length}</th>
            <th>Number of styles</th>
            <th>{props.currentProductStyles['results'].length}</th>
          </tr>
        </tbody>
      </table>
    </div>
  )
};

export default ModalDetails;