import React from 'react';
import SearchBar from './components/SearchBar';
import styled from 'styled-components';

const MainContainer = styled.div`
  margin: 0 auto;
  min-width: 300px;
`;

const App = () => {
  return (
    <>
      <MainContainer>
        <SearchBar />
      </MainContainer>
    </>
  );
};

export default App;
