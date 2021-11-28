import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './containers/login';
import Home from './containers/home';
import Error from './containers/Error';


const App = () => {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  </div>
};

export default App;