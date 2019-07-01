import React, { PureComponent } from 'react';
import T from 'prop-types';
import styled from 'styled-components';
import { Card as AntdCard } from 'antd';

const Card = styled(AntdCard)`
  &&& {
    :hover {
      opacity: 0.8;
    }
  }
`;

class Pokemon extends PureComponent {
  render() {
    const { data } = this.props;

    return (
      <div>
        <Card
          cover={<img src={data.get('imageUrl')} alt="Pokemon Card" />}
          hoverable
        />
      </div>
    );
  }
}

Pokemon.propTypes = {
  data: T.object,
};

export default Pokemon;
