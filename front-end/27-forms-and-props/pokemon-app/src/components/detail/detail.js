import React from 'react';
import PropTypes from 'prop-types';


// this is a stateless component, which is also referred to as a "dumb" component
export default class PokemonDetail extends React.Component {
  render() {
    return (
      // Conditionally render JSX if this.props.pokemon name is truthy
      this.props.pokemon.name 
        ? <div className="pokemon-detail">
            <h2>{this.props.pokemon.name}</h2>
            <img src={this.props.pokemon.sprites.front_shiny} />
            <div>
              <h3>Abilities</h3>
              <ul>
                {
                  this.props.pokemon.abilities.map((a, index) => <li key={index}>{a.ability.name}</li>)
                }
              </ul>
            </div>
            <div>
              <h3>Moves</h3>
              <ul>
                {
                  this.props.pokemon.moves.map((m, index) => <li key={index}>{m.move.name}</li>)
                }
              </ul>
            </div>
          </div>
          // down here we return "null" if this.props.pokemon.name is not truthy
        : null
    );
  }
}

PokemonDetail.propTypes = {
  pokemon: PropTypes.object,
};
