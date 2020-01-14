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
  });

  // Match snapshot
  it('matches snapshot', () => {
    const InputContainer = wrapper.find({ 'data-testid': 'InputComponent' }).at(0);
    expect(InputContainer).toMatchSnapshot();
  });

  // Step 1: User sees an input
  it('renders correctly', () => {
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

  //Step 3: User clicks on InputContainer, focus is on input field, Search Icon is visible, List is open

  it('checks if InputContainer focuses input element', () => {
    const InputContainer = wrapper.find({ 'data-testid': 'InputComponent' }).at(0);
    InputContainer.simulate('click');
    expect(InputContainer.find('input').get(0).ref.current).toEqual(document.activeElement);
  });

  it('sets list state to active and label moves up', () => {
    const InputField = wrapper.find({ 'data-testid': 'InputField' }).at(0);
    const SearchIcon = wrapper
      .find('SearchBar__SearchIcon')
      .at(0)
      .props();
    const Label = wrapper
      .find('SearchBar__FloatingLabel')
      .at(0)
      .props();

    expect(SearchIcon.active).toBe(false);
    expect(Label.above).toBe(false);

    act(() => {
      InputField.prop('onFocus')();
    });

    wrapper.update();
    expect(
      wrapper
        .find('SearchBar__SearchIcon')
        .at(0)
        .props().active,
    ).toBe(true);
    expect(
      wrapper
        .find('SearchBar__FloatingLabel')
        .at(0)
        .props().above,
    ).toBe(true);
  });

  // Step 4: User starts typing, text color changes. List is open, List gets filtered.
  // OnChange searchfield
  it('changes searchField state when user types', () => {
    const InputField = wrapper.find({ 'data-testid': 'InputField' }).at(0);

    InputField.simulate('change', {
      target: { value: 'Jane Doe' },
    });
    wrapper.update();
    expect(
      wrapper
        .find({ 'data-testid': 'InputField' })
        .at(0)
        .props().value,
    ).toBe('Jane Doe');
  });

  it('closes list when button gets clicked', () => {
    const InputField = wrapper.find({ 'data-testid': 'InputField' }).at(0);

    // Focus on input element so that close button is rendered
    act(() => {
      InputField.prop('onFocus')();
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

  it('clears searchfield when button gets clicked then closes list', () => {
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
    expect(
      wrapper
        .find({ 'data-testid': 'InputField' })
        .at(0)
        .props().value,
    ).toBe('');
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(true);

    // Click for the second time, List is closed
    closeButton.simulate('click');
    wrapper.update();
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(false);
  });

  // Step 5: Selection is made. Test handleClick function
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
