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
  render() {
    const {
      loading,
      handleInfiniteOnLoad,
      pokemonList,
      totalCount,
    } = this.props;

    return (
      <InfiniteScrollContainer
        initialLoad={false}
        pageStart={0}
        loadMore={handleInfiniteOnLoad}
        hasMore={!loading && pokemonList && pokemonList.size < totalCount}
      >
        <List
          loading={loading}
          dataSource={pokemonList || []}
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
  pokemonList: T.oneOfType([IT.list, T.array, T.bool]),
  totalCount: T.any,
};

export default PokemonList;
