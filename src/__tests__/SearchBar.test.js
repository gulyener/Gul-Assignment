import React, { useState } from 'react';
import { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import 'jest-styled-components';
import SearchBar from '../components/SearchBar';

// enzyme.configure({ adapter: new Adapter() });

describe('SearchBar Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<SearchBar />);
  });

  afterEach(() => {
    wrapper.unmount();
    jest.clearAllMocks();
  });

  // Match snapshot
  // it('renders like it should', () => {
  //   const InputContainer = wrapper.find({ 'data-testid': 'InputComponent' });
  //   expect(InputContainer).toMatchSnapshot();
  // });

  // Step 1: User sees an input
  it('renders like it should', () => {
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  // Step 2: Mouse hovers over the input. Border color changes
  it('changes border color on hover', () => {
    const container = wrapper.find({ 'data-testid': 'InputComponent' });
    expect(container).toHaveStyleRule('border', '1px solid #bfc5cd');
    expect(container).toHaveStyleRule('border', '1px solid #4a4a4a', {
      modifier: ':hover',
    });
  });

  //Step 3: User clicks on Input. focus is on input field, Search Icon is visible, List is open

  // it('sets list state to active and label moves up', () => {
  //   const InputWrapper = wrapper.find({ 'data-testid': 'InputField' });

  //   InputWrapper.find('input').simulate('click');
  //   expect(InputWrapper.find('input').get(0).ref.current).toEqual(document.activeElement);

  //   console.log(document.activeElement);
  //   const InputElement = InputWrapper.at(0);
  //   expect(InputElement.props().active).toBe(true);
  // });

  // Step 4: User starts typing, text color changes. List is open, List gets filtered.
  // OnChange searchfield
  // it('changes searchField state when user types', () => {
  //   const testState = { searchField: '' };

  //   const InputComponent = shallow(
  //     <Input
  //       value={testState.searchField}
  //       onChange={e => {
  //         testState.searchField = e.target.value;
  //       }}
  //     />,
  //   );

  //   InputComponent.simulate('change', {
  //     target: { value: 'John Doe' },
  //   });

  //   expect(testState.searchField).toEqual('John Doe');
  // });

  // Close button - on first click search field gets cleared, on second click it closes the list
  it('closes list when button gets clicked', () => {
    const InputBefore = wrapper.find({ 'data-testid': 'InputField' }).at(0);

    // Focus on input element so that close button is rendered
    act(() => {
      InputBefore.prop('onFocus')();
    });
    wrapper.update();

    // List is open, button is rendered
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(true);
    const closeButton = wrapper.find({ 'data-testid': 'CloseButton' }).at(0);
    closeButton.simulate('click');
    wrapper.update();

    // List is closed
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(false);
  });

  // if field is not empty
  it('clears searchfield when button gets clicked', () => {
    const InputField = wrapper.find({ 'data-testid': 'InputField' }).at(0);

    // Focus on input element and enter a value
    act(() => {
      InputField.prop('onChange')({ target: { value: 'John Doe' } });
      InputField.prop('onFocus')();
    });
    wrapper.update();

    // Check if there is value in search field
    expect(
      wrapper
        .find({ 'data-testid': 'InputField' })
        .at(0)
        .props().value,
    ).toBe('John Doe');

    const closeButton = wrapper.find({ 'data-testid': 'CloseButton' }).at(0);
    closeButton.simulate('click');
    wrapper.update();

    // Search field is empty, List is open
    expect(
      wrapper
        .find({ 'data-testid': 'InputField' })
        .at(0)
        .props().value,
    ).toBe('');
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(true);

    // Click for the second time
    closeButton.simulate('click');
    wrapper.update();

    // List is closed
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(false);
  });

  // Step 5: Selection is made. Text color is #4a4a4a
  // Test handleClick function

  it('changes searchField state when user makes selection', () => {
    const ListItem = wrapper.find('li').at(0);
    ListItem.simulate('click');
    wrapper.update();
    expect(
      wrapper
        .find({ 'data-testid': 'InputField' })
        .at(0)
        .props().value,
    ).toBe(ListItem.text());
  });
});
