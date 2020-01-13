import React, { useState } from 'react';
import { shallow, mount } from 'enzyme';

import styled, { find } from 'styled-components/test-utils';

import 'jest-styled-components';

import SearchBar, { ListContainer, Input, Button, Li } from '../components/SearchBar';

describe('SearchBar Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SearchBar />);
  });

  it('renders like it should', () => {
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  it('changes border color on hover', () => {
    let container = wrapper.find({'data-testid': "InputComponent"});

    expect(container).toHaveStyleRule('border', '1px solid #bfc5cd');
    expect(container).toHaveStyleRule('border', '1px solid #4a4a4a', {
      modifier: ':hover',
    });
  });

  it('render input component', () => {
    const InputElement = wrapper.find('#floatField');

    expect(InputElement).toHaveStyleRule('margin', '0');
    // expect({
    //   InputComponent,
    //   modifier: '&:hover',
    // }).toHaveStyleRule('border', 'none');
  });

  it('clears searchfield when button gets clicked', () => {
    // const testState = { searchField: '' };
    // const handleClick = jest.fn();
    // wrapper.find('[testid="clear-button"]').exists();
    // handleClick.simulate('click');
    // expect(handleClick).toHaveBeenCalled();
    // expect(ListComponent.state(active)).toEqual(true);
  });

  it('changes searchField state when user types', () => {
    const testState = { searchField: '' };

    const InputComponent = shallow(
      <Input
        value={testState.searchField}
        onChange={e => {
          testState.searchField = e.target.value;
        }}
      />,
    );

    InputComponent.simulate('change', {
      target: { value: 'John Doe' },
    });

    expect(testState.searchField).toEqual('John Doe');
  });

  it('calls onCLick handler with the right arguments', () => {
    const testState = { searchField: '' };
    const handleClick = event => {
      testState.searchField = event.target.dataset.id;
    };

    const mockItem = [{ name: 'Wade Dugmore' }];

    const wrapperList = mount(
      <Li data-id={mockItem[0].name} key={mockItem[0].name} onClick={handleClick}>
        {mockItem[0].name}
      </Li>,
    );

    wrapperList.simulate('click', { target: wrapperList }).at(0);

    expect(testState.searchField).toEqual('Jane Doe');
    // expect(wrapperList.clicked).toEqual(true);

    expect(handleClick.mock.calls.length).toEqual(1);
    // expect(handleClick.calledWith(mockItem, false)).to.be.true;
  });
});
