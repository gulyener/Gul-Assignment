import React, { useState, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';

const ListContainer = styled.div`
  position: absolute;
  width: 45vw;
  display: ${props => (props.active ? 'block' : 'none')};
  margin-top: ${props => (props.reverse ? null : '2px')};
  bottom: ${props => (props.reverse ? '82%' : null)};
  border: 1px solid #bfc5cd;
  border-radius: 6px;
  color: #4a4a4a;
  box-shadow: 0 5px 15px 0 rgba(74, 74, 74, 0.15);
  z-index: 10;
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
  const [listHeight, setListHeight] = useState(200);

  let distanceToBottom;
  if (inputRef.current) {
    distanceToBottom = window.innerHeight - inputRef.current.getBoundingClientRect().bottom;
  }

  function debounce(fn, ms) {
    let timer;
    return _ => {
      clearTimeout(timer);
      timer = setTimeout(_ => {
        timer = null;
        fn.apply(this, arguments);
      }, ms);
    };
  }

  const debouncedHandleResize = debounce(function handleResize() {
    if (inputRef.current) {
      const distanceToTop = inputRef.current.getBoundingClientRect().bottom;
      const distanceToBottom = window.innerHeight - distanceToTop;
      if (distanceToTop > distanceToBottom) {
        setIsReverse(true);
        setListHeight(distanceToTop - 80);
      } else {
        setIsReverse(false);
        setListHeight(distanceToBottom - 40);
      }
    }
  }, 400);

  useLayoutEffect(() => {
    if (isOpen) {
      debouncedHandleResize();
      window.addEventListener('resize', debouncedHandleResize);
      window.addEventListener('scroll', debouncedHandleResize);
      return () => {
        window.removeEventListener('resize', debouncedHandleResize);
        window.removeEventListener('scroll', debouncedHandleResize);
      };
    }
  }, [distanceToBottom]);

  return (
    <ListContainer active={isOpen} reverse={isReverse} aria-label="List of names">
      <Ul
        role="listbox"
        hideScroll={items.length === 1 ? true : null}
        height={listHeight}
        data-testid="ulElement"
      >
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
