import React, { PureComponent } from 'react';
import T from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Card as AntdCard } from 'antd';

const Card = styled(AntdCard)`
  &&& {
    max-width: 250px;
    height: 342px;
    background: none;
    border-radius: 10px;
    :hover {
      opacity: 0.8;
    }
  }
`;

class Pokemon extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <Link to={`/${data.get('id')}`}>
        <Card
          bordered={false}
          cover={<img src={data.get('imageUrl')} alt="Pokemon Card" />}
          hoverable
        />
      </Link>
    );
  }
}

Pokemon.propTypes = {
  data: T.object,
};

export default Pokemon;
