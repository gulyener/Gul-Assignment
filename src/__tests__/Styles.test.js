import React, { useState } from 'react';
import { shallow, mount } from 'enzyme';
import styled from 'styled-components';
import 'jest-styled-components';
import toJson from 'enzyme-to-json';

import SearchBar, {
  SearchIcon,
  FloatingLabel,
  InputContainer,
  ListContainer,
  ChevronIcon,
  Input,
} from '../components/SearchBar';

describe('<InputContainer> Styles', () => {
  const InputComponent = mount(<InputContainer onChange={jest.fn()} />);
  const ArrowDown = mount(<ChevronIcon />);
  const SearchSign = mount(<SearchIcon />);
  const DropdownList = mount(<ListContainer />);

  // Step 1: border:1px solid #bfc5cd; color text:#798697; arrow: #798697;
  // Search Icon is invisible, dropdown list is closed
  it('when not focused', () => {
    expect(InputComponent).toHaveStyleRule('border', '1px solid #bfc5cd');
    expect(InputComponent).toHaveStyleRule('color', '#798697');
    expect(ArrowDown).toHaveStyleRule('color', '#798697');
    expect(SearchSign).toHaveStyleRule('color', 'transparent');
    expect(DropdownList.hasClass('')).toEqual(true);
  });

  // Step 2: When user clicks on input border color becomes #4a4a4a Search Icon is invisible, dropdown list is closed
  it('on hover', () => {
    expect(InputComponent).toHaveStyleRule('border', '1px solid #4a4a4a', {
      modifier: ':hover',
    });
    expect(InputComponent).toHaveStyleRule('color', '#798697');
    expect(ArrowDown).toHaveStyleRule('color', '#798697');
    expect(SearchSign).toHaveStyleRule('color', 'transparent');
    expect(DropdownList.hasClass('')).toEqual(true);
  });

  // Step 3: When user clicks on input text color becomes #bfc5cd, search icon becomes visible, label moves up, dropdown list becomes visible
  it('on click', () => {
    expect(InputComponent).toHaveStyleRule('border', '1px solid #4a4a4a', {
      modifier: ':focus',
    });
    expect(InputComponent).toHaveStyleRule('color', '#bfc5cd', {
      modifier: ':focus',
    });
    expect(ArrowDown).toHaveStyleRule('color', '#798697');
    expect(SearchSign).toHaveStyleRule('color', '#174766', {
      modifier: '&.up',
    });
    expect(DropdownList).toHaveStyleRule('display', 'block', {
      modifier: '&.active',
    });
  });
});
