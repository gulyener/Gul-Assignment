import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown';
import { CloseCircle } from 'styled-icons/remix-line/CloseCircle';
import { Search } from 'styled-icons/icomoon/Search';
import * as data from '../../MOCK_DATA.json';

// filter out the names that are null and sort by alphabetical order
const namesList = data.default
  .filter(option => option.name)
  .sort((a, b) => a.name.localeCompare(b.name));

const transition = '0.35s ease-in-out';

const Container = styled.div`
  margin: 0 auto;
  padding: 100px 50px;
`;

const ChevronIcon = styled(ChevronDown)`
  transition: ${transition};
  flex: 0 0 30px;
  color: #798697;
  cursor: pointer;
  margin-right: 20px;
  &:hover {
    color: #4a4a4a;
  }
`;

const ResetIcon = styled(CloseCircle)`
  transition: ${transition};
  flex: 0 0 25px;
  color: #798697;
  cursor: pointer;
  margin-right: 25px;
  &:hover {
    color: #174766;
  }
`;

const SearchIcon = styled(Search)`
  color: #174766;
  width: 15px;
  margin-left: 5px;
  padding: 0 10px;
  display: ${props => (props.active ? 'block' : 'none')};
`;

const FloatingLabel = styled.label`
  position: absolute;
  font-size: 20px;
  transform: ${props =>
    props.above ? 'translate(3px, -22px) scale(0.8)' : 'translate(35px, 14px) scale(1)'};
  transition: ${transition};

  &:hover {
    cursor: text;
  }
`;

const Input = styled.input`
  flex-grow: 1;
  min-width: 80px;
  margin: 0;
  padding: 16px 0px;
  font-size: 16px;
  color: ${props => (props.above ? '#4a4a4a' : '#798697')};
  background-color: transparent;
  padding-left: ${props => (props.above && !props.active ? '30px' : '0')};
  border: none;
  outline: 0;
  overflow: hidden;

  ::placeholder {
    color: #bfc5cd;
  }
`;

const InputContainer = styled.div`
  transition: ${transition};
  display: flex;
  justify-content: flex-start;
  box-sizing: border-box;
  min-width: 150px;
  margin: 0;
  color: #798697;
  background-color: white;
  border: 1px solid #bfc5cd;
  border-radius: 5px;

  &:hover {
    border: 1px solid #4a4a4a;
  }
`;

const ListContainer = styled.div`
  display: ${props => (props.active ? 'block' : 'none')};
  margin-top: 3px;
  border: 1px solid #bfc5cd;
  border-radius: 5px;
  color: #4a4a4a;
  box-shadow: 0 5px 15px 0 rgba(74, 74, 74, 0.15);
  min-width: 150px;
`;

const Ul = styled.ul`
  list-style-type: none;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  overflow-y: ${props => (props.hideScroll ? 'hidden' : 'scroll')};
  overflow-x: hidden;
  max-height: 400px;

  @media (max-width: 768px) {
    max-height: 250px;
  }

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
  padding: 5px 20px;
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
  const [isAbove, setIsAbove] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    const value = event.target.dataset.id;
    setSearchField(value);
    if (value) {
      setIsAbove(true);
      setIsOpen(false);
    }
  };

  const handleFocus = () => {
    setIsAbove(true);
    setIsOpen(true);
  };

  const clearSearchField = event => {
    event.stopPropagation();
    if (searchField) {
      setSearchField('');
      inputRef.current.focus();
    } else {
      setIsOpen(false);
      setIsAbove(false);
    }
  };

  return (
    <>
      <Container>
        <InputContainer
          data-testid="InputComponent"
          role="search"
          aria-label="Search for names"
          onClick={() => inputRef.current.focus()}
        >
          <SearchIcon active={isOpen} />
          <FloatingLabel htmlFor="floatField" above={isAbove}>
            Contact
          </FloatingLabel>
          <Input
            id="floatField"
            type="text"
            value={searchField}
            placeholder={isOpen ? 'Type or search...' : ''}
            onChange={handleChange}
            onFocus={handleFocus}
            ref={inputRef}
            above={isAbove}
            active={isOpen}
          />
          {isOpen ? (
            <ResetIcon
              role="button"
              aria-label="Clear and exit"
              onClick={clearSearchField}
              data-testid="CloseButton"
            />
          ) : (
            <ChevronIcon />
          )}
        </InputContainer>
        {filteredNames.length > 0 && (
          <ListContainer active={isOpen} aria-label="List of names">
            <Ul role="listbox" hideScroll={filteredNames.length < 6 ? true : null}>
              {filteredNames.map(item => (
                <Li role="option" onClick={handleClick} data-id={item.name} key={item.name}>
                  {item.name}
                </Li>
              ))}
            </Ul>
          </ListContainer>
        )}
      </Container>
    </>
  );
};

export default SearchBar;
