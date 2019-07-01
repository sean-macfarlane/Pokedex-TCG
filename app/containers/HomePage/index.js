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

import { loadPokemonRequest } from 'containers/App/actions';
import { makeSelectLoading, makeSelectPokemon } from 'containers/App/selectors';

const ContainerLayout = styled(Layout)`
  &&& {
    display: flex;
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
    loadPokemon: T.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      search: '',
      page: 1,
    };
  }

  handleOnChange = e => this.setState({ search: e.target.value });

  handleOnSearch = value => {
    const { loadPokemon } = this.props;
    if (value && value !== '') {
      loadPokemon(`name=${value}`, 1);
      this.setState({ search: value, page: 1 });
    }
  };

  handleInfiniteOnLoad = () => {
    const { pokemon, loadPokemon } = this.props;
    const { page, search } = this.state;
    if (pokemon && !pokemon.get('loading') && pokemon.get('cards')) {
      loadPokemon(search, page + 1);
      this.setState({ page: page + 1 });
    }
  };

  render() {
    const { pokemon } = this.props;
    const { search } = this.state;

    return (
      <ContainerLayout>
        <Header
          search={search}
          onChange={this.handleOnChange}
          onSearch={this.handleOnSearch}
        />
        <Content>
          <PokemonList
            loading={pokemon && pokemon.get('loading')}
            pokemon={pokemon && pokemon.get('cards')}
          />
        </Content>
      </ContainerLayout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  globalLoading: makeSelectLoading(),
  pokemon: makeSelectPokemon(),
});

const mapDispatchToProps = dispatch => ({
  loadPokemon: (...params) => {
    dispatch(loadPokemonRequest(...params));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(HomePage);
