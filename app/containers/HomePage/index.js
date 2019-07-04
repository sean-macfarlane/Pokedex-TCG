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
import { Layout } from 'antd';
import styled from 'styled-components';

import theme from 'styles';

import Header from 'components/Header';
import PokemonList from 'components/PokemonList';

import {
  loadPokemonRequest,
  loadTypesRequest,
  loadSetsRequest,
} from 'containers/App/actions';
import {
  makeSelectLoading,
  makeSelectPokemon,
  makeSelectTypes,
  makeSelectSets,
} from 'containers/App/selectors';

const ContainerLayout = styled(Layout)`
  &&& {
    display: flex;
    background: none;
  }
`;

const { Content: AntdContent } = Layout;

const Content = styled(AntdContent)`
  &&& {
    padding-top: ${theme.GlobalHeader.height};
    display: flex;
  }
`;

class HomePage extends React.PureComponent {
  static propTypes = {
    pokemon: T.oneOfType([IT.map, T.bool]),
    types: T.oneOfType([IT.map, T.bool]),
    sets: T.oneOfType([IT.map, T.bool]),
    loadPokemon: T.func,
    loadTypes: T.func,
    loadSets: T.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      selectedTypes: [],
      selectedSets: [],
      typesOperatorAnd: ',',
      page: 1,
    };
  }

  componentDidMount() {
    const { loadTypes, loadSets } = this.props;
    this.handleOnSearch();
    loadTypes();
    loadSets();
  }

  handleOnChangeSearch = e => this.setState({ search: e.target.value });

  handleOnChangeTypes = value => {
    this.setState({ selectedTypes: value });
  };

  handleOnChangeTypesOperator = e => {
    this.setState({ typesOperatorAnd: e.target.value });
  };

  handleOnChangeSets = value => {
    this.setState({ selectedSets: value });
  };

  handleOnClickReset = () => {
    this.setState({ selectedTypes: [], selectedSets: [] });
  };

  handleOnSearch = () => {
    const { loadPokemon } = this.props;
    const {
      search,
      selectedTypes,
      selectedSets,
      typesOperatorAnd,
    } = this.state;
    let query = '';

    if (search) {
      query += `name=${search}`;
    }

    if (selectedTypes && selectedTypes.length > 0) {
      query += `&types=`;
      selectedTypes.forEach(t => {
        query += `${t}${typesOperatorAnd}`;
      });
    }

    if (selectedSets && selectedSets.length > 0) {
      query += `&setCode=`;
      selectedSets.forEach(s => {
        query += `${s}|`;
      });
    }

    this.setState({ page: 1 }, loadPokemon(query, 1));
  };

  handleOnFilter = (types, sets) => {
    const { search } = this.state;
    this.handleOnSearch(search, types, sets);
  };

  handleInfiniteOnLoad = () => {
    const { pokemon, loadPokemon } = this.props;
    const { page, search } = this.state;
    if (pokemon && !pokemon.get('loading')) {
      loadPokemon(`name=${search}`, page + 1);
      this.setState({ page: page + 1 });
    }
  };

  render() {
    const { pokemon, types, sets } = this.props;
    const {
      search,
      page,
      selectedTypes,
      selectedSets,
      typesOperatorAnd,
    } = this.state;

    return (
      <ContainerLayout>
        <Header
          search={search}
          types={types}
          sets={sets}
          selectedTypes={selectedTypes}
          selectedSets={selectedSets}
          typesOperatorAnd={typesOperatorAnd}
          onChangeSearch={this.handleOnChangeSearch}
          onSearch={this.handleOnSearch}
          onChangeTypes={this.handleOnChangeTypes}
          onChangeTypesOperator={this.handleOnChangeTypesOperator}
          onChangeSets={this.handleOnChangeSets}
          onClickReset={this.handleOnClickReset}
        />
        <Content>
          <PokemonList
            page={page}
            loading={pokemon && pokemon.get('loading')}
            pokemon={pokemon && pokemon.get('data')}
            handleInfiniteOnLoad={this.handleInfiniteOnLoad}
          />
        </Content>
      </ContainerLayout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  globalLoading: makeSelectLoading(),
  pokemon: makeSelectPokemon(),
  types: makeSelectTypes(),
  sets: makeSelectSets(),
});

const mapDispatchToProps = dispatch => ({
  loadPokemon: (...params) => {
    dispatch(loadPokemonRequest(...params));
  },
  loadTypes: (...params) => {
    dispatch(loadTypesRequest(...params));
  },
  loadSets: (...params) => {
    dispatch(loadSetsRequest(...params));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(HomePage);
