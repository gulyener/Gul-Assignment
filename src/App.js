import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import styled from 'styled-components';
import * as data from '../MOCK_DATA.json';

const namesList = data.default
  .filter(option => option.name)
  .sort((a, b) => a.name.localeCompare(b.name));

const App = () => {
  const [selectedName, setSelectedName] = useState('');

  return (
    <>
      <div style={{ height: '500px' }}></div>
      <SearchBar
        content={namesList}
        selectedName={selectedName}
        setSelectedName={setSelectedName}
      />
      <div style={{ height: '900px' }}></div>
    </>
  );
};

export default App;
