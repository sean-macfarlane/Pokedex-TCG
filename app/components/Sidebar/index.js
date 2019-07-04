import React from 'react';
import styled from 'styled-components';
import { Layout, Select as AntdSelect } from 'antd';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';

import theme from 'styles';

const { Sider: AntdSider } = Layout;
const { Option } = AntdSelect;

const Sider = styled(AntdSider)`
  &&& {
    background: ${theme.Sidebar.background};
    border-right: ${theme.Sidebar.borderRight};
    left: 0;
    overflow: hidden;
    position: fixed;
    overflow-y: auto;
    z-index: 1;
    height: calc(100% - 64px);
  }
`;

const Select = styled(AntdSelect)`
  &&& {
    width: 100%;
  }
`;

export class Sidebar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedTypes: [],
      set: false,
    };
  }

  render() {
    const { types } = this.props;
    const { selectedTypes, set } = this.state;
    return (
      <Sider width={parseInt(theme.Sidebar.width, 10)}>
        <Select mode="multiple" placeholder="Types...">
          <Option key={1}>Test</Option>
        </Select>
      </Sider>
    );
  }
}

Sidebar.propTypes = {
  types: T.oneOfType([IT.list, T.array, T.bool]),
  handleOnSearch: T.func,
};

export default Sidebar;
