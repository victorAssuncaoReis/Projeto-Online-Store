import React from 'react';
import shoppingCart from '../icons/shopping-cart.png';

export class Shoppingcart extends React.Component {
  render() {
    return (
      <div>
        <section className="shopping-cart-btn">
          <img src={ shoppingCart } alt="shopping cart" />
        </section>
      </div>
    );
  }
}

export default Shoppingcart;
