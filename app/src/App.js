import React from 'react';
import { ethers } from 'ethers';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import  Navbar  from './components/Navbar';

import Home from './pages/Home/home';
import SimpleEscrow from './pages/SimpleEscrow/escrowContract';
import Locker from './pages/Locker/lockerContract';
import VestingContract from './pages/Vesting/vestingContract';
import History from './pages/History/history';




function App() {
  return (
    <div className='App' >
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/simple-escrow" element={<SimpleEscrow />} />
          <Route exact path="/locker" element={<Locker />} />
          <Route exact path="/vesting" element={<VestingContract />} />
          <Route exact path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;