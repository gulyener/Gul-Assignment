import React, { useState } from 'react';
import { shallow, mount } from 'enzyme';
import 'jest-styled-components';
import SearchBar, { ListContainer, Input, Button, Li } from '../components/SearchBar';

// Enzyme.configure({ adapter: new Adapter() });

describe('SearchBar Component', () => {
  let wrapper;
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState');
  useStateSpy.mockImplementation(init => [init, setState]);

  beforeEach(() => {
    wrapper = mount(<SearchBar />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders like it should', () => {
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  // Match snapshot
  it('renders like it should', () => {
    const InputContainer = wrapper.find({ 'data-testid': 'InputComponent' });
    expect(InputContainer.find('input')).toMatchSnapshot();
  });

  it('changes border color on hover', () => {
    const container = wrapper.find({ 'data-testid': 'InputComponent' });

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
    const testState = { searchField: '' };
    const handleClick = jest.fn();
    const closeButton = wrapper.find({ 'data-testid': 'clear-button' });

    closeButton.simulate('click');
    expect(handleClick).toHaveBeenCalled();
    expect(ListComponent.state(active)).toEqual(true);
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

  // handleClick

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
    expect(wrapperList.clicked).toEqual(true);
    expect(handleClick.mock.calls.length).toEqual(1);
    expect(handleClick.calledWith(mockItem, false)).to.be.true;
  });

  // handleFocus

  it('sets list state to active and label moves up', () => {
    const InputWrapper = wrapper.find({ 'data-testid': 'InputField' });

    InputWrapper.find('input').simulate('click');
    expect(InputWrapper.find('input').get(0).ref.current).toEqual(document.activeElement);

    const InputElement = wrapper.find('input');
    expect(InputElement.prop('placeholder')).toBe(true);
  });
});
