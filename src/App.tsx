import React from 'react';
import logo from './logo.svg';
import './App.css';
import FetchTags from './components/TagsComponent';
import Navigation from './components/Navigation';
import Background from './components/Background';
import Break from './components/Break';
import { Box } from '@mui/material';
import ErrorBox from './components/ErrorBox';

function App() {
  return (
    <div className="App">
        <Break />
        <Background />
        <Box minHeight={"100svh"} bgcolor={"white"}>
          <span style={{
            position: "relative",
            zIndex: "100"
          }}><Navigation /></span>
          <span style={{
            position: "relative",
            zIndex: "0"
          }}
          ><FetchTags /></span>
        </Box>
        <ErrorBox />
    </div>
  );
}

export default App;
