import React, { PureComponent } from 'react';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';
import styled from 'styled-components';
import { List as AntdList } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

import Pokemon from 'components/Pokemon';

import pokeballUrl from 'images/pokeball.png';

const { Item } = AntdList;

const List = styled(AntdList)`
  &&& {
    padding-top: 24px;
    overflow: hidden;
    width: 100%;
  }
`;

const ListItem = styled(Item)`
  &&& {
    justify-content: center;
    display: flex;
  }
`;

const InfiniteScrollContainer = styled(InfiniteScroll)`
  width: 100%;
`;

const PokeballIcon = styled.img`
  width: 50px;
  margin: 8px;
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
      <InfiniteScrollContainer
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading}
      >
        <List
          loading={loading}
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
          locale={{
            emptyText: (
              <div>
                <PokeballIcon src={pokeballUrl} alt="Pokeball" />
                <div>No Results.</div>
              </div>
            ),
          }}
        />
      </InfiniteScrollContainer>
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
