import React, { PureComponent } from 'react';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';
import { List } from 'antd';

import Pokemon from 'components/Pokemon';

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
    const { list } = this.state;
    return (
      <List
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => <Pokemon key={item.get('id')} data={item} />}
      />
    );
  }
}

PokemonList.propTypes = {
  pokemon: T.oneOfType([IT.list, T.array, T.bool]),
  page: T.any,
};

export default PokemonList;
