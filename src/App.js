import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import styled from 'styled-components';

import * as data from '../MOCK_DATA.json';

const MainContainer = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const namesList = data.default
  .filter(option => option.name)
  .sort((a, b) => a.name.localeCompare(b.name));

const App = () => {
  const [selectedName, setSelectedName] = useState('');

  return (
    <>
      <MainContainer>
        <div style={{ width: '500px', height: '800px', backgroundColor: 'blue' }}></div>
        <SearchBar
          content={namesList}
          selectedName={selectedName}
          setSelectedName={setSelectedName}
        />
        <div style={{ width: '600px', height: '900px', backgroundColor: 'pink' }}></div>
      </MainContainer>
    </>
  );
};

export default App;
