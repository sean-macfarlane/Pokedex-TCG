/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';
import qs from 'qs';

import PokemonList from 'components/PokemonList';

import { loadPokemonListRequest } from 'containers/App/actions';
import {
  makeSelectLocation,
  makeSelectLoading,
  makeSelectPokemonList,
} from 'containers/App/selectors';

class HomePage extends React.PureComponent {
  static propTypes = {
    pokemonList: T.oneOfType([IT.map, T.bool]),
    loadPokemonList: T.func,
    location: T.object,
  };

  componentDidMount() {
    const { pokemonList } = this.props;
    if (!pokemonList || !pokemonList.get('data')) {
      this.loadPokemon(1);
    }
  }

  loadPokemon = page => {
    const { pokemonList, loadPokemonList, location } = this.props;
    const query = qs.parse(location.search.slice(1));

    if (pokemonList && !pokemonList.get('loading')) {
      loadPokemonList({ ...query }, page);
    }
  };

  handleInfiniteOnLoad = () => {
    const { pokemonList } = this.props;
    if (
      pokemonList &&
      pokemonList.get('data').size < pokemonList.get('totalCount')
    ) {
      this.loadPokemon(pokemonList.get('page') + 1);
    }
  };

  render() {
    const { pokemonList } = this.props;

    return (
      <PokemonList
        loading={pokemonList && pokemonList.get('loading')}
        pokemonList={pokemonList && pokemonList.get('data')}
        handleInfiniteOnLoad={this.handleInfiniteOnLoad}
        totalCount={pokemonList && pokemonList.get('totalCount')}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  globalLoading: makeSelectLoading(),
  pokemonList: makeSelectPokemonList(),
  location: makeSelectLocation(),
});

const mapDispatchToProps = dispatch => ({
  loadPokemonList: (...params) => {
    dispatch(loadPokemonListRequest(...params));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(HomePage);
