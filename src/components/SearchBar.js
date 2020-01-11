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

const transition = '0.4s ease-in-out';

const Container = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 100px;
`;

const ChevronIcon = styled(ChevronDown)`
  transition: ${transition};
  color: #798697;
  cursor: pointer;
  width: 30px;
  margin-right: 20px;
  &:hover {
    color: #4a4a4a;
  }
`;

const ResetIcon = styled(CloseCircle)`
  transition: ${transition};
  color: #798697;
  cursor: pointer;
  width: 25px;
  margin-right: 25px;
  &:hover {
    color: #174766;
  }
`;

const SearchIcon = styled(Search)`
  color: ${props => (props.above ? '#174766' : 'transparent')};
  transition: ${transition};
  width: 20px;
  margin-left: 5px;
  padding: 0 10px;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  flex: 0 0 10px;
  padding: 0;

  // &:focus {
  //   outline: none;
  // }
`;

const Input = styled.input`
  flex-grow: 1;
  min-width: 80px;
  margin: 0;
  padding: 16px 0px;
  font-size: 16px;
  color: #798697;
  background-color: transparent;
  border: none;
  outline: 0;
  overflow: hidden;
`;

const FloatingLabel = styled.label`
  position: absolute;
  font-size: 20px;
  transform-origin: top center;
  transform: translate(35px, 14px) scale(1);
  transition: ${transition};

  &:hover {
    cursor: text;
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

  &:focus {
    color: #bfc5cd;
    border: 1px solid #4a4a4a;
  }

  &.up ${FloatingLabel} {
    transform: translate(3px, -20px) scale(0.85);
  }

  &.up ${Input} {
    color: #4a4a4a;
  }
`;

const ListContainer = styled.div`
  position: relative;
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
  const [placeholder, setPlaceholder] = useState('');
  const [labelState, setLabelState] = useState('');
  const [listState, setListState] = useState('');

  const handleKeyPress = event => {
    if (event.keyCode === '9') {
      event.preventDefault();
      inputRef.nextElementByTabIndex.focus();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  let timeOutId = null;
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
    if (value) {
      setLabelState('up');
      setListState('');
    }
  };

  const handleBlur = () => {
    timeOutId = setTimeout(() => {
      setListState('');
      setLabelState('');
      setPlaceholder('');
      setSearchField('');
    }, 50);
  };

  const handleFocus = () => {
    clearTimeout(timeOutId);
    setPlaceholder('Type or search...');
    setLabelState('up');
    setListState('active');
  };

  const clearSearchField = event => {
    if (event.target.tagName === 'svg') {
      event.stopPropagation();
      if (searchField) {
        setSearchField('');
        inputRef.current.focus();
      } else {
        handleBlur();
      }
    }
  };

  return (
    <>
      <Container>
        <InputContainer
          role="search"
          aria-label="Search for names"
          className={labelState}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onClick={() => inputRef.current.focus()}
        >
          <SearchIcon above={labelState} />
          <FloatingLabel htmlFor="floatField">Contact</FloatingLabel>
          <Input
            id="floatField"
            type="text"
            placeholder={placeholder}
            value={searchField}
            onChange={handleChange}
            ref={inputRef}
          />

          {listState === 'active' ? (
            <Button onClick={clearSearchField} aria-label="Clear field and exit">
              <ResetIcon />
            </Button>
          ) : (
            <Button aria-hidden="true">
              <ChevronIcon />
            </Button>
          )}
        </InputContainer>
        {filteredNames.length > 0 && (
          <ListContainer active={listState} aria-label="list of names">
            <Ul role="listbox" hideScroll={filteredNames.length < 6 ? 'hideScroll' : ''}>
              {filteredNames.map(item => (
                <Li
                  role="option"
                  tabindex="0"
                  onClick={handleClick}
                  data-id={item.name}
                  key={item.name}
                >
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
