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

import PokemonList from 'components/PokemonList';

import { loadPokemonListRequest } from 'containers/App/actions';
import {
  makeSelectLoading,
  makeSelectPokemonList,
  makeSelectSearchParams,
} from 'containers/App/selectors';

class HomePage extends React.PureComponent {
  static propTypes = {
    pokemonList: T.oneOfType([IT.map, T.bool]),
    loadPokemonList: T.func,
    searchParams: IT.map,
  };

  constructor(props) {
    super(props);

    this.state = {
      page: 1,
    };
  }

  componentDidMount() {
    const { pokemonList, loadPokemonList, searchParams } = this.props;
    if (pokemonList && !pokemonList.get('loading')) {
      loadPokemonList(searchParams.toJS(), 1);
    }
  }

  handleInfiniteOnLoad = () => {
    const { pokemonList, loadPokemonList, searchParams } = this.props;
    const { page } = this.state;
    if (pokemonList && !pokemonList.get('loading')) {
      loadPokemonList(searchParams.toJS(), page + 1);
      this.setState({ page: page + 1 });
    }
  };

  render() {
    const { pokemonList } = this.props;
    const { page } = this.state;

    return (
      <PokemonList
        page={page}
        loading={pokemonList && pokemonList.get('loading')}
        pokemonList={pokemonList && pokemonList.get('data')}
        handleInfiniteOnLoad={this.handleInfiniteOnLoad}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({
  globalLoading: makeSelectLoading(),
  pokemonList: makeSelectPokemonList(),
  searchParams: makeSelectSearchParams(),
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
