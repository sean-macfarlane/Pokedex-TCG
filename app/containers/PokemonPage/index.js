/*
 * Pokemon Page
 *
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';
import { Spin, Card, Row, Col } from 'antd';

import { loadPokemonRequest } from 'containers/App/actions';
import { makeSelectLoading, makeSelectPokemon } from 'containers/App/selectors';
import styled from 'styled-components';

const Container = styled.div`
  padding: 24px;
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

const CardImg = styled.img`
  width: 100%;
  max-width: 600px;
`;

const Label = styled.span`
  font-weight: bold;
`;

class PokemonPage extends React.PureComponent {
  static propTypes = {
    match: T.any,
    pokemon: T.oneOfType([IT.map, T.bool]),
    loadPokemon: T.func,
  };

  componentDidMount() {
    const { match, loadPokemon } = this.props;
    if (match.params.id) {
      loadPokemon(match.params.id);
    }
  }

  render() {
    const { pokemon } = this.props;

    if (!pokemon.get('loading') && pokemon.get('data')) {
      const data = pokemon.get('data');
      return (
        <Container>
          <Row gutter={24}>
            <Col lg={12} md={24}>
              <CardImg src={data.get('imageUrlHiRes')} alt={data.get('name')} />
            </Col>
            <Col lg={12} md={24}>
              <Card title={data.get('name')}>
                {data.get('nationalPokedexNumber') ? (
                  <Row>
                    <Label>Pokédex #</Label>
                    {data.get('nationalPokedexNumber')}
                  </Row>
                ) : null}
                <Row>{`${data.get('supertype')} ${data.get('subtype')}`}</Row>
                {data.get('evolvesFrom') ? (
                  <Row>
                    <Label>Evolves from: </Label>
                    {data.get('evolvesFrom')}
                  </Row>
                ) : null}
                {data.get('types') ? (
                  <Row>
                    <Label>Type: </Label>
                    {data.get('types')}
                  </Row>
                ) : null}
                <Row>
                  <Label>Rarity: </Label>
                  {data.get('rarity')}
                </Row>
                <Row>
                  <Label>Series: </Label>
                  {data.get('series')}
                </Row>
                <Row>
                  <Label>Set: </Label>
                  {data.get('set')}
                </Row>
                <Row>
                  <Label>Artist: </Label>
                  {data.get('artist')}
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      );
    }
    return <Spin />;
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

export default compose(withConnect)(PokemonPage);
