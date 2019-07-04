import React, { PureComponent } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { Input } from 'antd';

const { Search } = Input;

const SearchBox = styled(Search)`
  &&& {
    width: 100%;
    min-width: 100px;
    margin: 0 8px;

    @media only screen and (min-width: 769px) {
      max-width: 400px;
    }
  }
`;

class SearchInput extends PureComponent {
  render() {
    const { value, onChange, onSearch } = this.props;

    return (
      <SearchBox
        value={value}
        onChange={onChange}
        onSearch={onSearch}
        placeholder="Search..."
      />
    );
  }
}

SearchInput.propTypes = {
  value: T.any,
  onChange: T.func,
  onSearch: T.func,
};

export default SearchInput;
