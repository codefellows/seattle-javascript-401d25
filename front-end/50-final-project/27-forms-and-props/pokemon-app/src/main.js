import React from 'react';
import { render as reactDomRender } from 'react-dom'; 
import superagent from 'superagent';
import './style/main.scss';

const apiUrl = 'https://pokeapi.co/api/v2/pokemon';

class PokemonSearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeName: '',
    };

    this.handlePokemonNameChange = this.handlePokemonNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handlePokemonNameChange(event) {
    this.setState({ pokeName: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.pokemonSelect(this.state.pokeName);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input 
          type="text"
          name="pokemonName"
          placeholder="Search for a Pokemon"
          value={this.state.pokeName}
          onChange={this.handlePokemonNameChange}
        />
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonLookup: {},
      pokemonSelected: null,
      pokemonNameError: null,
    };

    this.pokemonSelect = this.pokemonSelect.bind(this);
    this.renderAbilitiesList = this.renderAbilitiesList.bind(this);
  }

  // built-in lifecycle hook from React, is invoked immediately after updating occurs
  componentDidUpdate() {
    console.log('__UPDATE STATE__', this.state);
  }

  // built-in lifecycle hook from React, invoked after component is rendered on the page 
  componentDidMount() {
    if (localStorage.pokemonLookup) {
      try {
        const pokemonLookup = JSON.parse(localStorage.pokemonLookup);
        return this.setState({ pokemonLookup });
        // return undefined;
      } catch (err) {
        return console.error(err);
      }
    } else {
      return superagent.get(apiUrl)
        .then((response) => {
          console.log(response);
          const pokemonLookup = response.body.results.reduce((dict, result) => {
            dict[result.name] = result.url;
            return dict;
          }, {});

          try {
            localStorage.pokemonLookup = JSON.stringify(pokemonLookup);
            this.setState({ pokemonLookup });
          } catch (err) {
            console.error(err);
          }
        })
        .catch(console.error);
    }
  }

  pokemonSelect(name) {
    if (!this.state.pokemonLookup[name]) {
      this.setState({
        pokemonSelected: null,
        pokemonNameError: name,
      });
    } else {
      return superagent.get(this.state.pokemonLookup[name])
        .then((response) => {
          this.setState({
            pokemonSelected: response.body,
            pokemonNameError: null,
          });
        })
        .catch(console.error);
    }
    return undefined;
  }

  renderAbilitiesList(pokemon) {
    return (
      <ul>
        { pokemon.abilities.map((item, index) => {
          return (
            <li key={index}>
              <p>{item.ability.name}</p>
            </li>
          );
        })}
      </ul>
    );
  }


  render() {
    return (
      <section>
        <h1>Pokemon Form Demo</h1>
        <PokemonSearchForm 
          pokemonSelect={this.pokemonSelect}
        />
        { 
          this.state.pokemonNameError ? 
            <div>
              <h2 className="error">
                { `"${this.state.pokemonNameError}"`} does not exist.
                Please make another request.
              </h2>
            </div> : 
            <div>
               {
                 this.state.pokemonSelected ? 
                 <div>
                   <div>
                     <img src={this.state.pokemonSelected.sprites.front_default} />
                   </div>
                   <h2>Selected: {this.state.pokemonSelected.name}</h2>
                   <h3>Abilities:</h3>
                   { this.renderAbilitiesList(this.state.pokemonSelected)}
                 </div> :
                 <div>
                   Please make a request to see pokemon data.
                 </div>
               }
            </div>
        }

      </section>
    );
  }
}

const container = document.createElement('div');
document.body.appendChild(container);

reactDomRender(<App />, container);
