import React, { useState, useRef } from 'react';
import styled from 'styled-components';

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
  max-height: 370px;

  @media (max-width: 600px) {
    max-height: 250px;
  }

  @media (min-width: 900px) {
    max-height: 490px;
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
    cursor: default;
  }
`;

const ListComponent = ({ names, handleClick, isOpen }) => {
  return (
    <ListContainer active={isOpen} aria-label="List of names">
      <Ul role="listbox" hideScroll={names.length < 6 ? true : null}>
        {names.map(item => (
          <Li role="option" onClick={handleClick} data-id={item.name} key={item.name}>
            {item.name}
          </Li>
        ))}
      </Ul>
    </ListContainer>
  );
};

export default ListComponent;
