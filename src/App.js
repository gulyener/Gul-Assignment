import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import styled from 'styled-components';

import * as data from '../MOCK_DATA.json';

const MainContainer = styled.div``;

const namesList = data.default
  .filter(option => option.name)
  .sort((a, b) => a.name.localeCompare(b.name));

const App = () => {
  const [selectedName, setSelectedName] = useState('');

  return (
    <>
      <MainContainer>
        <div style={{ height: '600px', backgroundColor: 'blue' }}></div>
        <SearchBar
          content={namesList}
          selectedName={selectedName}
          setSelectedName={setSelectedName}
        />
        <div style={{ height: '900px', backgroundColor: 'pink' }}></div>
      </MainContainer>
    </>
  );
};

export default App;
