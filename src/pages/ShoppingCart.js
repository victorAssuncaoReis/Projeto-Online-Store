import React from 'react';
import shoppingCart from '..';

export class Shoppingbag extends React.Component {
  render() {
    return (
      <div>
        <section>
          <img src={ shoppingIcon } alt="shopping bag" />
        </section>
      </div>
    );
  }
}

export default Shoppingbag;
