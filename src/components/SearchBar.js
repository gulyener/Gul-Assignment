import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { ChevronDown } from 'styled-icons/boxicons-regular/ChevronDown';
import { CloseCircle } from 'styled-icons/remix-line/CloseCircle';
import { Search } from 'styled-icons/icomoon/Search';
import DropdownList from './DropdownList';

const transition = '0.35s ease-in-out';

const Container = styled.div`
  position: relative;
  padding: 20px;
  background-color: red;
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
  display: ${props => (props.active ? 'block' : 'none')};
  color: #174766;
  width: 15px;
  margin-left: 5px;
  padding: 0 10px;
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
  color: #798697;
  background-color: white;
  border: 1px solid #bfc5cd;
  border-radius: 5px;
  &:hover {
    border: 1px solid #4a4a4a;
  }
`;

const SearchBar = ({ content, selectedName, setSelectedName }) => {
  const [items, setItems] = useState(content);
  const [initialItems, setInitialItems] = useState(content);
  const [searchField, setSearchField] = useState('');
  const [isAbove, setIsAbove] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (searchField.length > 0) {
      const newList = initialItems.filter(option => {
        const userName = option.name.toLowerCase();
        const searchText = searchField.toLowerCase();
        return userName.includes(searchText);
      });
      setItems(newList);
    }
  }, [searchField]);

  const handleChange = event => {
    setSearchField(event.target.value);
  };

  const handleClick = event => {
    const value = event.target.dataset.id;
    setSearchField(value);
    setSelectedName(value);
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
      setItems(content);
    }
  };

  return (
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
          data-testid="InputField"
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
      {items.length > 0 && (
        <DropdownList
          isOpen={isOpen}
          handleClick={handleClick}
          items={items}
          inputRef={inputRef}
          data-testid="DropdownListComponent"
        />
      )}
    </Container>
  );
};

export default SearchBar;
