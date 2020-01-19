import React, { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  position: absolute;
  display: ${props => (props.active ? 'block' : 'none')};
  margin-top: ${props => (props.reverse ? null : '60px')};
  border: 1px solid #bfc5cd;
  border-radius: 6px;
  color: #4a4a4a;
  box-shadow: 0 5px 15px 0 rgba(74, 74, 74, 0.15);
  z-index: 10;
  bottom: ${props => (props.reverse ? '80%' : null)};
`;

const Ul = styled.ul`
  max-height: ${props => props.height + 'px'};
  list-style-type: none;
  border-radius: 5px;
  padding: 0;
  margin: 0;
  overflow-y: ${props => (props.hideScroll ? 'hidden' : 'scroll')};
  overflow-x: hidden;

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
    cursor: default;
  }
`;

const DropdownList = ({ items, handleClick, isOpen, inputRef }) => {
  const [isReverse, setIsReverse] = useState(false);
  const [listHeight, setListHeight] = useState('200px');

  let viewportOffset;
  if (inputRef.current) {
    viewportOffset = inputRef.current.getBoundingClientRect();
  }

  useLayoutEffect(() => {
    if (inputRef.current) {
      const inputBottom = inputRef.current.getBoundingClientRect().bottom;
      const distanceToBottom = window.innerHeight - inputBottom;
      const distanceToTop = inputBottom - 50;
      if (distanceToTop > distanceToBottom) {
        setIsReverse(true);
        setListHeight(inputBottom - 80);
      } else {
        setIsReverse(false);
        setListHeight(distanceToBottom - 40);
      }
    }
  }, [viewportOffset]);

  return (
    <ListContainer active={isOpen} reverse={isReverse} aria-label="List of names">
      <Ul role="listbox" hideScroll={items.length === 1 ? true : null} height={listHeight}>
        {items.map(item => (
          <Li role="option" onClick={handleClick} data-id={item.name} key={item.name}>
            {item.name}
          </Li>
        ))}
      </Ul>
    </ListContainer>
  );
};

export default DropdownList;
