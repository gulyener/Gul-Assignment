import React, { useState } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown';
import { Search } from 'styled-icons/icomoon/Search';
import * as data from '../../MOCK_DATA.json';

// import names and filter out the ones that are null
const namesList = data.default.filter(option => option.name);
// sort names by alphabetical order
namesList.sort((a, b) => a.name.localeCompare(b.name));

const ChevronIcon = styled(ChevronDown)`
  padding: 10px;
  color: #798697;
  width: 30px;
`;

const SearchIcon = styled(Search)`
  color: transparent;
  width: 20px;
  padding: 0 10px;

  &.up {
    color: rgb(23, 71, 102);
    transition: color 0.4s ease-in-out;
  }
`;

const Dropdown = styled.div`
  position: absolute;
  display: inline-block;
  margin: 50px;
  min-width: 300px;
`;

const FloatingLabel = styled.label`
  position: absolute;
  font-size: 18px;
  transform-origin: top center;
  transform: translate(-5px, 15px) scale(1);
  transition: 0.4s ease-in-out;

  &:hover {
    cursor: text;
  }
`;

const InputContainer = styled.div`
  position: relative;
  margin: 0;
  color: #798697;
  background-color: white;
  border: 1px solid #bfc5cd;
  border-radius: 5px;

  &:hover {
    color: #798697;
    border: 1px solid #4a4a4a;
  }

  &:focus {
    color: #bfc5cd;
    border: 1px solid #4a4a4a;
  }

  &.up ${FloatingLabel} {
    transform: translate(-32px, -22px) scale(1);
  }
`;

const Input = styled.input`
  min-width: 230px;
  margin: 0;
  padding: 16px 0px;
  font-size: 16px;
  color: #798697;
  background-color: transparent;
  border: none;
  outline: 0;
`;

const ListContainer = styled.div`
  position: relative;
  display: none;
  margin-top: 3px;
  border: 1px solid #bfc5cd;
  border-radius: 5px;
  color: #4a4a4a;
  box-shadow: 0 5px 15px 0 rgba(74, 74, 74, 0.15);

  &.active {
    display: block;
  }
`;

const Ul = styled.ul`
  list-style-type: none;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 250px;
`;

const Li = styled.li`
  background-color: #ffffff;
  padding: 5px 15px;
  line-height: 30px;
  text-decoration: none;
  font-size: 18px;
  color: #798697;

  &:hover {
    background-color: #f7f7f7;
    color: #4a4a4a;
  }
`;

const InvisibleButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const SearchBar = () => {
  const [searchField, setSearchField] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [labelState, setLabelState] = useState('');
  const [listState, setListState] = useState('');

  const filteredNames = namesList.filter(option => {
    const userName = option.name.toLowerCase();
    const searchText = searchField.toLowerCase();
    return userName.includes(searchText);
  });

  const handleChange = event => {
    const searchText = event.target.value;
    setSearchField(searchText);
  };

  const handleMouseDown = event => {
    setListState('active');
    const value = event.target.dataset.id;
    setSearchField(value);
    // when a name is chosen, close the list, label stays on top
    if (value) {
      setLabelState('up');
      setListState('');
    }
  };

  const handleFocus = () => {
    setPlaceholder('Type or search...');
    setLabelState('up');
    setListState('active');
  };

  const handleBlur = () => {
    if (searchField.length > 0) {
      setLabelState('up');
      setListState('');
    } else {
      setListState('');
      setLabelState('');
      setPlaceholder('');
    }
  };

  return (
    <>
      <Dropdown>
        <InputContainer className={labelState} onFocus={handleFocus} onBlur={handleBlur}>
          <SearchIcon className={labelState} />
          <FloatingLabel for="floatField">Contact</FloatingLabel>
          <Input
            id="floatField"
            type="text"
            placeholder={placeholder}
            value={searchField}
            onChange={handleChange}
          ></Input>

          <InvisibleButton
            onClick={() => {
              listState !== 'active' ? setListState('active') : setListState('');
            }}
          >
            <ChevronIcon />
          </InvisibleButton>
        </InputContainer>
        <ListContainer className={listState}>
          <Ul>
            {filteredNames.length > 0 &&
              filteredNames.map(option => (
                <Li onMouseDown={handleMouseDown} data-id={option.name}>
                  {option.name}
                </Li>
              ))}
          </Ul>
        </ListContainer>
      </Dropdown>
    </>
  );
};

export default SearchBar;
