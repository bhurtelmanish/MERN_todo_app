import React from 'react';
import Navbar from '../components/Navbar';
import LandingPage from './LandingPage';
import Todos from './Todos';
import { Route, Routes } from 'react-router-dom';

const Pages = () => {
  return (
    <>
     <Navbar />
     <Routes>
        <Route path='/landingpage' element={<LandingPage />} />
        <Route path='/todos' element={<Todos />} />
     </Routes>
    </>
  )
}

export default Pages;
