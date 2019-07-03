import React, { PureComponent } from 'react';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';
import styled from 'styled-components';
import { List as AntdList } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import Pokemon from 'components/Pokemon';

const { Item } = AntdList;

const List = styled(AntdList)`
  &&& {
    padding-top: 24px;
    overflow: hidden;
  }
`;

const ListItem = styled(Item)`
  &&& {
    justify-content: center;
    display: flex;
  }
`;

export class PokemonList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: props.pokemon || [],
      page: props.page || 1,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { pokemon } = this.props;
    const { list, page } = this.state;

    if (nextProps.pokemon !== pokemon) {
      if (nextProps.page > page) {
        this.setState({
          page: nextProps.page,
          list: list.concat(nextProps.pokemon),
        });
      } else {
        this.setState({
          list: nextProps.pokemon,
        });
      }
    }
  }

  render() {
    const { loading, handleInfiniteOnLoad } = this.props;
    const { list } = this.state;
    return (
      <InfiniteScroll
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading}
      >
        <List
          dataSource={list}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
            xxl: 6,
          }}
          renderItem={item => (
            <ListItem>
              <Pokemon key={item.get('id')} data={item} />
            </ListItem>
          )}
        />
      </InfiniteScroll>
    );
  }
}

PokemonList.propTypes = {
  loading: T.bool,
  handleInfiniteOnLoad: T.func,
  pokemon: T.oneOfType([IT.list, T.array, T.bool]),
  page: T.any,
};

export default PokemonList;
