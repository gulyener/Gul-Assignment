import React, from 'react';
import {  mount } from 'enzyme';
import 'jest-styled-components';
import DropdownList from '../components/DropdownList';

// Enzyme.configure({ adapter: new Adapter() });

describe('SearchBar Component', () => {
  const names = [{ name: 'John Doe' }, { name: 'Jane Doe' }, { name: 'Elle Woods' }];
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<DropdownList names={names} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('maps each name correctly', () => {
    names.map(item => {
      expect(wrapper.text()).toMatch(item.name);
    });
  });
});
