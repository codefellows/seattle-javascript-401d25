import React from 'react';
import PropTypes from 'prop-types';

import './list.scss';

export default class PokemonList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
    };
  }

  // this will replace the "onSubmit" handler of a "form" tag
  handleSubmit = (event) => {
    event.preventDefault();
    // this.props will get passed in later when we import the component
    this.props.searchMethod(this.state.search);
  }

  // this will be an event handler that replaces the "onChange" event handler of an "input" tag
  handleSearch = (event) => {
    const search = event.target.value;
    this.setState({ search });
  }

  render() {
    return (
      <div className="pokemon-list">
        <form onSubmit={ this.handleSubmit }>
          <input 
            onChange={ this.handleSearch }
            placeholder="Search..."
          />
          {
            this.props.pokemon.map((pokemon, index) => {
              return (
                <div key={index}>
                  <div
                    className="item"
                    id={ pokemon.url }
                    onClick= { this.props.pokemonLoader }
                  >
                    {pokemon.name}
                  </div>
                </div>
              );
            })
          }
        </form>

      </div>
    );
  }
}

PokemonList.propTypes = {
  searchMethod: PropTypes.func,
  pokemon: PropTypes.array,
  pokemonLoader: PropTypes.func,
};
