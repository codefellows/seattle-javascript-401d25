import React from 'react';
import PokemonList from '../list/list';
import PokemonDetail from '../detail/detail';
import { fetchData } from './../../lib/utils';

import './app.scss';

const pokemonApi = 'https://pokeapi.co/api/v2/pokemon';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: {},
      pokemonList: [],
      loading: false,
    };
  }

  load = (url) => {
    this.setState({ loading: true });
    return fetchData(url)
      .then((data) => {
        this.setState({loading: false});
        return data;
      })
      .catch(console.error);
  }

  // this is a lifecyle hook provided to us by React
  componentDidMount() {
    // when you draw yourself on the page, do this logic here
    this.loadPokemonList()
      .then((pokemonList) => {
        this.setState({ pokemonList });
      })
      .catch(console.error);
  }

  loadPokemonList = () => {
    return this.load(pokemonApi)
      .then((pokeData) => {
        return pokeData.results;
      })
      .catch(console.error);
  }

  pokemonDetails = (event) => {
    const url = event.target.id;
    return this.load(url)
      .then((pokemon) => {
        this.setState({ pokemon });
      })
      .catch(console.error);
  }

  pokemonSearch = (search) => {
    const url = `${pokemonApi}/${search}`;
    return this.load(url)
      .then((pokemon) => {
        this.setState({ pokemon });
      })
      .catch(console.error);
  }

  render() {
    return (
      <main className="container">
        <PokemonList 
          searchMethod={ this.pokemonSearch }
          pokemon={ this.state.pokemonList }
          pokemonLoader={ this.pokemonDetails }
        />
        <PokemonDetail pokemon={this.state.pokemon} />
      </main>
    );
  }
}