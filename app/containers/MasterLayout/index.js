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

import {
  loadPokemonListRequest,
  loadTypesRequest,
  loadSetsRequest,
} from 'containers/App/actions';
import {
  makeSelectLoading,
  makeSelectSearchParams,
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
    searchParams: IT.map,
    loadPokemonList: T.func,
    loadTypes: T.func,
    loadSets: T.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      search: props.searchParams.get('name') || '',
      selectedTypes:
        (props.searchParams.get('types') &&
          props.searchParams.get('types').toJS()) ||
        [],
      selectedSets:
        (props.searchParams.get('sets') &&
          props.searchParams.get('sets').toJS()) ||
        [],
      typesOperatorAnd: props.searchParams.get('typesOperator') || ',',
    };
  }

  componentDidMount() {
    const { loadTypes, loadSets } = this.props;
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
    const { loadPokemonList } = this.props;
    const {
      search,
      selectedTypes,
      selectedSets,
      typesOperatorAnd,
    } = this.state;

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
  searchParams: makeSelectSearchParams(),
});

const mapDispatchToProps = dispatch => ({
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
