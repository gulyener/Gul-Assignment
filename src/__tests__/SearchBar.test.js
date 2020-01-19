import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import 'jest-styled-components';
import SearchBar from '../components/SearchBar';
import App from '../App';

describe('<SearchBar/> Component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<App />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  // // Match snapshot
  // it('renders <SearchBar/> snapshot', () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  // // Step 1: User sees an input
  it('renders <SearchBar/> correctly', () => {
    expect(wrapper.isEmptyRender()).toEqual(false);
  });

  // Step 2: Mouse hovers over the input, border color changes
  it('changes border color on hover', () => {
    const container = wrapper.find({ 'data-testid': 'InputComponent' });
    expect(container).toHaveStyleRule('border', '1px solid #bfc5cd');
    expect(container).toHaveStyleRule('border', '1px solid #4a4a4a', {
      modifier: ':hover',
    });
  });

  //Step 3: User clicks on InputContainer, focus is on input field. SearchIcon is visible, dropdown list is open
  it('checks if InputContainer focuses on input element', () => {
    const InputContainer = wrapper.find({ 'data-testid': 'InputComponent' }).at(0);
    InputContainer.simulate('click');
    expect(InputContainer.find('input').get(0).ref.current).toEqual(document.activeElement);
  });

  it('on input focus, sets list state to active and label moves up', () => {
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

  // Step 4: User starts typing, tests handleChange function
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

  // Step 5: Selection is made, tests handleClick function
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

  it('closes list when close button gets clicked', () => {
    const InputField = wrapper.find({ 'data-testid': 'InputField' }).at(0);

    // First focus on input element so that close button is rendered
    act(() => {
      InputField.prop('onFocus')();
    });
    wrapper.update();

    // List is open, button is rendered
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(true);
    const closeButton = wrapper.find({ 'data-testid': 'CloseButton' }).at(0);
    closeButton.simulate('click');
    wrapper.update();

    // List is closed after clicking
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(false);
  });

  it('clears searchField when button gets clicked, then closes list', () => {
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

    // Text color changes on focus
    expect(wrapper.find({ 'data-testid': 'InputField' }).at(0)).toHaveStyleRule('color', '#4a4a4a');

    // On first click searchField is cleared
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

    // On second click list is closed
    closeButton.simulate('click');
    wrapper.update();
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(false);

    // Text color goes back to default
    expect(wrapper.find({ 'data-testid': 'InputField' }).at(0)).toHaveStyleRule('color', '#798697');
  });

  it('changes dropdown height when window resizes', () => {
    jest.useFakeTimers();
    const InputField = wrapper.find({ 'data-testid': 'InputField' }).at(0);
    let ulElement = wrapper.find({ 'data-testid': 'ulElement' }).at(0);
    expect(ulElement.props().height).toEqual(200);

    act(() => {
      InputField.prop('onFocus')();
    });
    wrapper.update();
    expect(wrapper.find({ 'data-testid': 'DropdownListComponent' }).props().isOpen).toBe(true);

    global.innerHeight = 700;

    // Fires the useEffect call in DropdownList component
    act(() => {
      jest.runAllTimers();
    });
    wrapper.update();

    ulElement = wrapper.find({ 'data-testid': 'ulElement' }).at(0);
    expect(ulElement.props().height).not.toEqual(200);
    expect(ulElement.props().height).toBeGreaterThan(0);
    expect(ulElement.props().height).toEqual(660);

    global.innerHeight = 400;
    act(() => {
      jest.runAllTimers();
    });
    wrapper.update();

    ulElement = wrapper.find({ 'data-testid': 'ulElement' }).at(0);
    expect(ulElement.props().height).not.toEqual(200);
    expect(ulElement.props().height).toBeGreaterThan(0);
    expect(ulElement.props().height).toEqual(360);
  });
});
