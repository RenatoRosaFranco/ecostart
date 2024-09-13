import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.scss';

import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";
import HomePage from "./pages/home/Index";

import { ToastContainer } from "react-toastify";
import { useAuth } from './hooks/useAuth';

function App() {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>
    };

    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path="/login" element={
                        user ? <Navigate to="/" replace /> : <SignIn />
                    } />
                    <Route path="/criar-conta" element={
                        user ? <Navigate to="/" replace /> : <SignUp />
                    } />
                    <Route path='*' element={<HomePage />} />
                </Routes>

                <ToastContainer />
                <Footer />
            </div>
        </Router>
    );
}

export default App;
