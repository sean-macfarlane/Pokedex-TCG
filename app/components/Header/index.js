import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Layout } from 'antd';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';

import theme from 'styles';

import Search from 'components/Search';
import Filters from 'components/Filters';
import Link from 'components/Link';

import logoImage from 'images/logo.png';
import logoImageSmall from 'images/logo-icon.png';

const { Header } = Layout;

const FixedHeader = styled(({ collapsed, isMobile, ...rest }) => (
  <Header {...rest} />
))`
  &&& {
    background: ${theme.GlobalHeader.background};
    border-bottom: ${theme.GlobalHeader.borderBottom};
    display: flex;
    height: ${theme.GlobalHeader.height};
    padding: 0;
    position: fixed;
    z-index: 1;
    width: 100%;
    align-items: center;
  }
`;

const LogoContainer = styled(Link)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  padding: 0 0 0 8px;
  @media only screen and (min-width: 769px) {
    padding: 0 0 0 40px;
  }
`;

const SearchBox = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;

  @media only screen and (min-width: 769px) {
    margin-right: 225px;
  }
`;

class GlobalHeader extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      logoUrl: logoImage,
    };
  }

  componentDidMount() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { logoUrl } = this.state;
    const width = window.innerWidth;

    if (width <= 576 && logoUrl === logoImage) {
      this.setState({
        logoUrl: logoImageSmall,
      });
    } else if (width > 576 && logoUrl === logoImageSmall) {
      this.setState({
        logoUrl: logoImage,
      });
    }
  };

  render() {
    const {
      search,
      onChangeSearch,
      onChangeTypes,
      onChangeSets,
      onSearch,
      onClickReset,
      types,
      sets,
      selectedTypes,
      selectedSets,
      typesOperatorAnd,
      onChangeTypesOperator,
    } = this.props;
    const { logoUrl } = this.state;

    return (
      <FixedHeader>
        <LogoContainer to="/">
          <img src={logoUrl} alt="logo" height="32" />
        </LogoContainer>
        <SearchBox>
          <Search
            value={search}
            onChange={onChangeSearch}
            onSearch={onSearch}
          />
          <Filters
            types={types}
            sets={sets}
            selectedTypes={selectedTypes}
            selectedSets={selectedSets}
            typesOperatorAnd={typesOperatorAnd}
            onSearch={onSearch}
            onChangeTypes={onChangeTypes}
            onChangeTypesOperator={onChangeTypesOperator}
            onChangeSets={onChangeSets}
            onClickReset={onClickReset}
          />
        </SearchBox>
      </FixedHeader>
    );
  }
}

GlobalHeader.propTypes = {
  search: T.any,
  selectedTypes: T.array,
  selectedSets: T.array,
  typesOperatorAnd: T.any,
  onChangeSearch: T.func,
  onChangeTypes: T.func,
  onChangeTypesOperator: T.func,
  onChangeSets: T.func,
  onSearch: T.func,
  onClickReset: T.func,
  types: T.oneOfType([IT.map, T.bool]),
  sets: T.oneOfType([IT.map, T.bool]),
};

export default GlobalHeader;
