import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

import 'bootstrap/dist/css/bootstrap.min.css';

import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import HomePage from "./pages/home/Index";

function App() {
  return (
      <Router>
        <div className="App">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;
