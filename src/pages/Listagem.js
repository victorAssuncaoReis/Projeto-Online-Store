import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromCategoryAndQuery,
} from '../services/api';
import '../styles/Listagem.css';
import '../styles/ProductsCard.css';
import SearchGlass from './Searchglass';
import ShoppingBag from './ShoppingBag';
import ShoppingCart from './ShoppingCart';
// import Detalhes from './Detalhes';

class Listagem extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      search: '',
      productsSearch: [],
    };
  }

  componentDidMount() {
    this.loadCategories();
  }

  loadCategories = async () => {
    const arrayCategories = await getCategories();
    this.setState({ categories: arrayCategories });
  };

  buttonCategories = async ({ target }) => {
    const { id } = target;
    const response = await getProductsFromCategoryAndQuery(id, '');
    const { results } = response;
    this.setState({
      productsSearch: results,
    });
  };

  handleClick = async () => {
    const { search } = this.state;
    const response = await getProductsFromCategoryAndQuery('', search);
    const { results } = response;
    this.setState({
      productsSearch: results,
    });
  };

  handleSearch = ({ target }) => {
    const { value } = target;
    this.setState({
      search: value,
    });
  };

  /*   cartAdd = ({ target }) => {
    const { value } = target;
    const { productsSearch } = this.state;
    console.log(value);
    this.setState((prev) => ({ cart: [...prev.cart, value] }));
    const result = productsSearch.find((produto) => produto.id === value);
    localStorage.setItem('Produto', JSON.stringify([...result, result]));
  }; */
  loadShoppingCart = () => JSON.parse(localStorage.getItem('produtos'));

  saveShoppingCart = (product) => localStorage
    .setItem('produtos', JSON.stringify(product));

  cartAdd = ({ target }) => {
    const { value } = target;
    const { productsSearch } = this.state;
    const result = productsSearch.find((produto) => produto.id === value);
    const cart = this.loadShoppingCart();
    // result.quantity = 0;
    if (cart) {
      if (cart.find((item) => item.id === value)) {
        cart.quantity += 1;
        return this.saveShoppingCart([...cart]);
      }
      result.quantity = 1;
      return this.saveShoppingCart([...cart, result]);
    }
    if (result) {
      result.quantity = 1;
      return this.saveShoppingCart([result]);
    }
  };

  render() {
    const { categories, productsSearch } = this.state;
    return (
      <div>
        <div className="header">
          <div>
            <label htmlFor="search">
              <input
                type="text"
                id="search"
                onChange={ this.handleSearch }
                data-testid="query-input"
                name="search"
                className="search-input"
                placeholder="Digite o que você busca"
              />
            </label>
            <button
              type="button"
              data-testid="query-button"
              onClick={ this.handleClick }
              className="search-btn"
            >
              <SearchGlass />
            </button>
          </div>
          <div className="title">
            <div className="title-image">
              <ShoppingBag />
            </div>
            <div className="title-texts">
              <p className="front-end-title">
                FRONT-END
              </p>
              <p className="online-store-title">
                online store
              </p>
            </div>
          </div>
          <Link to="/CarrinhoDeCompras" data-testid="shopping-cart-button">
            {/*             <button type="button" className="shopping-cart-btn">
              /*               <span className="shopping-span-btn">Carrinho de compras </span> */
              <ShoppingCart />
              /*             </button> */}
            {' '}
          </Link>
        </div>
        <div className="content-container">
          <div className="categorias">
            <p className="categories-text">Categorias:</p>
            <hr className="cat-line" />
            {categories.map((categoria) => (
              <button
                type="button"
                key={ categoria.id }
                id={ categoria.id }
                onClick={ this.buttonCategories }
                data-testid="category"
                className="category-btns"
              >
                {categoria.name}
              </button>
            ))}
          </div>
          <div className="results-div">
            {
              productsSearch.length > 0
                ? productsSearch.map((item) => (
                  <div
                    data-testid="product"
                    key={ item.id }
                    className="products-result"
                  >
                    <Link
                      to={ `/Detalhes/${item.id}` }
                      id={ item.id }
                      data-testid="product-detail-link"
                    >
                      <img
                        src={ item.thumbnail }
                        alt={ item.name }
                        className="product-thumb"
                      />
                      <p className="product-title">{item.title}</p>
                      <p className="product-price">
                        R$
                        {' '}
                        {item.price}
                      </p>
                    </Link>
                    <button
                      data-testid="product-add-to-cart"
                      type="button"
                      onClick={ this.cartAdd }
                      value={ item.id }
                      className="product-btn"
                    >
                      Adicionar ao Carrinho
                    </button>
                  </div>
                )) : (
                  <div className="message-div">
                    <div className="not-found">
                      <p>Nenhum produto foi encontrado</p>
                    </div>
                    <div className="search-text">
                      <p data-testid="home-initial-message">
                        Digite algum termo de pesquisa ou escolha uma categoria.
                      </p>
                    </div>
                  </div>
                )
            }
          </div>
        </div>
      </div>
    );
  }
}

export default Listagem;
