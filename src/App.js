import './App.css';
import Box from '@mui/material/Box';
import Layout from './Components/Layout';
import Toolbar from '@mui/material/Toolbar';
import { useState } from 'react';
import PassengersInfo from './Components/PassengersInfo';
import AirlinesInfo from './Components/AirlinesInfo';

function App() {
  const [activePage, setActivePage]=useState('passengers')

  return (
    <Box sx={{ display: 'flex' }}>
      <Layout setActivePage={setActivePage} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {activePage==='airlines' ? <AirlinesInfo /> : <PassengersInfo />}
      </Box>
    </Box>
  );
}

export default App;
