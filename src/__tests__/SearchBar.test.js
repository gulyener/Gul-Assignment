import React, { useState } from 'react';
import { shallow, mount } from 'enzyme';
import styled from 'styled-components';

import 'jest-styled-components';
import toJson from 'enzyme-to-json';

import SearchBar, {
  InputContainer,
  Input,
  InvisibleButton,
  ListContainer,
} from '../components/SearchBar';

describe('<InvisibleButton> component', () => {
  // it('renders correctly', () => {
  //   const tree = renderer
  //     .create(
  //       <InvisibleButton>
  //         <ChevronIcon />
  //       </InvisibleButton>,
  //     )
  //     .toJSON();
  //   expect(tree).toMatchSnapshot();
  // });
});

describe.only('SearchBar Component', () => {
  const handleClick = jest.fn();

  let wrapper = mount(<SearchBar />);

  it('renders like it should', () => {
    expect(wrapper).not.toBeNull();
  });

  it('should render Button with the correct styles', () => {
    const component = mount(<InvisibleButton onClick={handleClick} />);
    component.find(InvisibleButton).simulate('click');

    expect(component).toHaveStyleRule('border', 'none');
  });

  it('should toggle ListContainer when InvisibleButton gets clicked', () => {
    wrapper.find(InvisibleButton).simulate('click');
    const ListComponent = wrapper.find(ListContainer);

    expect(handleClick).toHaveBeenCalled();
    expect(ListComponent.hasClass('active')).toEqual(true);
  });

  it('when user types in input, searchField state changes', () => {
    const testState = { searchField: '' };

    const InputComponent = shallow(
      <Input
        value={testState.searchField}
        onChange={e => {
          testState[e.target.searchField] = e.target.value;
        }}
      />,
    );

    InputComponent.simulate('change', {
      target: { searchField: 'searchField', value: 'John Doe' },
    });

    expect(testState.searchField).toEqual('John Doe');

    // expect(handleDivClick).toHaveBeenCalled();
  });
});
