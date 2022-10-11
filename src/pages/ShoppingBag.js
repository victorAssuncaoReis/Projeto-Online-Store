import React from 'react';
import shoppingIcon from '../icons/bag.png';
import '../styles/Listagem.css';

export class Shoppingbag extends React.Component {
  render() {
    return (
      <div>
        <section>
          <img src={ shoppingIcon } alt="shopping bag" className="bag-image" />
        </section>
      </div>
    );
  }
}

export default Shoppingbag;
