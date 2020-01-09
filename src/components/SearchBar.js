import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown';
import { Search } from 'styled-icons/icomoon/Search';
import * as data from '../../MOCK_DATA.json';

// import names and filter out the ones that are null
const namesList = data.default.filter(option => option.name);
// sort names by alphabetical order
namesList.sort((a, b) => a.name.localeCompare(b.name));

const ChevronIcon = styled(ChevronDown)`
  color: #798697;
  width: 30px;
  margin-right: 10px;
`;

const SearchIcon = styled(Search)`
  flex-basis: 20px;
  flex-shrink: 0;
  color: transparent;
  width: 20px;
  padding: 0 10px;

  &.up {
    color: rgb(23, 71, 102);
    transition: color 0.4s ease-in-out;
  }
`;

const Dropdown = styled.div`
  display: inline-block;
  width: 300px;
  margin: 50px;
  padding: 20px;
`;

const InvisibleButton = styled.button`
  flex-basis: 20px;
  flex-shrink: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  display: block;
  margin: 0;
  padding: 16px 0px;
  font-size: 16px;
  color: #798697;
  background-color: transparent;
  border: none;
  outline: 0;
`;

const FloatingLabel = styled.label`
  position: absolute;
  font-size: 18px;
  transform-origin: top center;
  transform: translate(30px, 15px) scale(1);
  transition: 0.4s ease-in-out;

  &:hover {
    cursor: text;
  }
`;

const InputContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
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
    transform: translate(3px, -22px) scale(1);
  }

  &.up ${Input} {
    color: #4a4a4a;
  }
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

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 7px;
  }

  ::-webkit-scrollbar:vertical {
    width: 12px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgb(23, 71, 102);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 0 4px 4px 0;
    background-color: rgb(222, 226, 230);
  }
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

const SearchBar = () => {
  const [searchField, setSearchField] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [labelState, setLabelState] = useState('');
  const [listState, setListState] = useState('');

  let timeOutId = null;
  // to make the whole input container clickable
  const inputRef = useRef();

  const filteredNames = namesList.filter(option => {
    const userName = option.name.toLowerCase();
    const searchText = searchField.toLowerCase();
    return userName.includes(searchText);
  });

  const handleChange = event => {
    const searchText = event.target.value;
    setSearchField(searchText);
  };

  const handleClick = event => {
    clearTimeout(timeOutId);
    const value = event.target.dataset.id;
    setSearchField(value);
    // if a name is chosen, close the list, label stays on top
    if (value) {
      setLabelState('up');
      setListState('');
    }
  };

  const handleBlur = () => {
    // if there is a name chosen, label stays up else clear everything
    if (searchField.length > 0) {
      setLabelState('up');
    } else {
      timeOutId = setTimeout(() => {
        setListState('');
        setLabelState('');
        setPlaceholder('');
      }, 100);
    }
  };

  const handleFocus = () => {
    clearTimeout(timeOutId);
    setPlaceholder('Type or search...');
    setLabelState('up');
    setListState('active');
  };

  const handleChevronClick = event => {
    event.stopPropagation();
    listState !== 'active' ? setListState('active') : setListState('');
  };

  return (
    <>
      <Dropdown>
        <InputContainer
          className={labelState}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={() => inputRef.current.focus()}
        >
          <SearchIcon className={labelState} />
          <FloatingLabel htmlFor="floatField">Contact</FloatingLabel>
          <Input
            id="floatField"
            type="text"
            placeholder={placeholder}
            value={searchField}
            onChange={handleChange}
            ref={inputRef}
          />
          <InvisibleButton onClick={handleChevronClick}>
            <ChevronIcon />
          </InvisibleButton>
        </InputContainer>
        {filteredNames.length > 0 && (
          <ListContainer className={listState}>
            <Ul>
              {filteredNames.map(option => (
                <Li onClick={handleClick} data-id={option.name} key={option.name}>
                  {option.name}
                </Li>
              ))}
            </Ul>
          </ListContainer>
        )}
      </Dropdown>
    </>
  );
};

export default SearchBar;
