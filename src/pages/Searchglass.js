import React from 'react';
import glass from '../icons/search.png';
import '../styles/Listagem.css';

export class Searchglass extends React.Component {
  render() {
    return (
      <div className="search-icon">
        <img
          src={ glass }
          alt="search icon"
        />
      </div>
    );
  }
}

export default Searchglass;
