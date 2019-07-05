import React, { PureComponent } from 'react';
import T from 'prop-types';
import IT from 'react-immutable-proptypes';
import styled from 'styled-components';
import { Select, Popover, Button, Radio } from 'antd';

const { Option } = Select;
const { Group } = Radio;

const FiltersButton = styled(Button)`
  &&& {
    line-height: 1;
  }
`;

const MultiSelect = styled(Select)`
  &&& {
    width: 240px;
    margin-bottom: 12px;
  }
`;

const Label = styled.div`
  &&& {
    font-size: 9pt;
    margin-bottom: 8px;
    display: flex;
  }
`;

const RadioGroup = styled(Group)`
  &&& {
    margin-left: auto;
  }
`;

const RadioButton = styled(Radio)`
  &&& {
    font-size: 9pt;
    font-family: inherit;
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const FilterButton = styled(Button)`
  &&& {
    margin-left: 8px;
  }
`;

const SetIcon = styled.img`
  height: 20px;
  margin-right: 12px;
`;

class Filters extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
    };
  }

  handleVisibleChange = visible => {
    this.setState({ visible });
  };

  render() {
    const {
      types,
      sets,
      typesOperatorAnd,
      selectedTypes,
      selectedSets,
      onChangeTypes,
      onChangeSets,
      onSearch,
      onClickReset,
      onChangeTypesOperator,
    } = this.props;
    const { visible } = this.state;
    const content = (
      <div>
        <Label>
          {`Type:`}
          <RadioGroup onChange={onChangeTypesOperator} value={typesOperatorAnd}>
            <RadioButton value=",">And</RadioButton>
            <RadioButton value="|">Or</RadioButton>
          </RadioGroup>
        </Label>
        <MultiSelect
          value={selectedTypes}
          mode="multiple"
          placeholder="Types"
          onChange={onChangeTypes}
        >
          {types && types.get('data')
            ? types
                .get('data')
                .map(t => <Option key={t}>{t}</Option>)
                .toArray()
            : null}
        </MultiSelect>
        <Label>
          {`Set:`}
          <RadioGroup disabled>
            <RadioButton defaultChecked>Or</RadioButton>
          </RadioGroup>
        </Label>
        <MultiSelect
          value={selectedSets}
          mode="multiple"
          placeholder="Set"
          optionFilterProp="label"
          onChange={onChangeSets}
        >
          {sets && sets.get('data')
            ? sets
                .get('data')
                .map(t => (
                  <Option key={t.get('code')} label={t.get('name')}>
                    <SetIcon src={t.get('symbolUrl')} />
                    {t.get('name')}
                  </Option>
                ))
                .toArray()
            : null}
        </MultiSelect>
        <ButtonsContainer>
          <FilterButton type="dashed" onClick={onClickReset}>
            {`Reset`}
          </FilterButton>
          <FilterButton type="primary" onClick={onSearch}>
            {`Search`}
          </FilterButton>
        </ButtonsContainer>
      </div>
    );

    return (
      <Popover
        content={content}
        title="Filter"
        trigger="click"
        visible={visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottom"
        getPopupContainer={n => n.parentElement}
      >
        <FiltersButton icon="filter" />
      </Popover>
    );
  }
}

Filters.propTypes = {
  selectedTypes: T.array,
  selectedSets: T.array,
  typesOperatorAnd: T.any,
  onChangeTypes: T.func,
  onChangeTypesOperator: T.func,
  onChangeSets: T.func,
  onSearch: T.func,
  onClickReset: T.func,
  types: T.oneOfType([IT.map, T.bool]),
  sets: T.oneOfType([IT.map, T.bool]),
};

export default Filters;
