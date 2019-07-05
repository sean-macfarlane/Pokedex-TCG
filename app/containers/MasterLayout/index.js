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
import qs from 'qs';
import { replace, push } from 'react-router-redux';

import theme from 'styles';

import Header from 'components/Header';

import {
  loadPokemonListRequest,
  loadTypesRequest,
  loadSetsRequest,
} from 'containers/App/actions';
import {
  makeSelectLocation,
  makeSelectLoading,
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

class MasterLayout extends React.PureComponent {
  static propTypes = {
    children: T.node,
    types: T.oneOfType([IT.map, T.bool]),
    sets: T.oneOfType([IT.map, T.bool]),
    loadPokemonList: T.func,
    loadTypes: T.func,
    loadSets: T.func,
    historyReplace: T.func,
    redirect: T.func,
    location: T.object,
  };

  constructor(props) {
    super(props);

    const query = qs.parse(props.location.search.slice(1));

    this.state = {
      search: query.name || '',
      selectedTypes: query.types || [],
      selectedSets: query.sets || [],
      typesOperatorAnd: query.typesOperator || ',',
    };
  }

  componentDidMount() {
    const { loadTypes, loadSets } = this.props;
    loadTypes();
    loadSets();
  }

  componentWillReceiveProps(nextProps) {
    const { loadPokemonList, historyReplace } = this.props;

    // Reloads home page to default when Logo clicked
    if (
      nextProps.location.state === 'reset' &&
      nextProps.location.pathname === '/'
    ) {
      historyReplace({
        state: null,
      });
      window.scrollTo(0, 0);
      this.setState(
        {
          search: '',
          selectedTypes: [],
          selectedSets: [],
          typesOperatorAnd: ',',
        },
        loadPokemonList({}, 1)
      );
    }
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
    const { loadPokemonList, historyReplace, location, redirect } = this.props;
    const {
      search,
      selectedTypes,
      selectedSets,
      typesOperatorAnd,
    } = this.state;

    if (location.pathname !== '/') {
      redirect({
        pathname: '/',
        search: qs.stringify({
          name: search,
          types: selectedTypes,
          sets: selectedSets,
          typesOperator: typesOperatorAnd,
        }),
      });
    } else {
      historyReplace({
        search: qs.stringify({
          name: search,
          types: selectedTypes,
          sets: selectedSets,
          typesOperator: typesOperatorAnd,
        }),
      });
    }

    window.scrollTo(0, 0);
    loadPokemonList(
      {
        name: search,
        types: selectedTypes,
        sets: selectedSets,
        typesOperator: typesOperatorAnd,
      },
      1
    );
  };

  render() {
    const { children, types, sets } = this.props;
    const {
      search,
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
        <Content>{children}</Content>
      </ContainerLayout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  globalLoading: makeSelectLoading(),
  types: makeSelectTypes(),
  sets: makeSelectSets(),
  location: makeSelectLocation(),
});

const mapDispatchToProps = dispatch => ({
  historyReplace: (...args) => {
    dispatch(replace(...args));
  },
  redirect: path => dispatch(push(path)),
  loadPokemonList: (...params) => {
    dispatch(loadPokemonListRequest(...params));
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

export default compose(withConnect)(MasterLayout);
