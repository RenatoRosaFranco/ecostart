import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import './App.scss';

import { WhatsAppWidget } from 'react-whatsapp-widget';
import 'react-whatsapp-widget/dist/index.css';

// Layouts
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";

// Components
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";

import EditProfile from "./components/profile/EditProfile";
import UserProfile from "./components/profile/UserProfile";
import CompaniesPage from "./pages/companies/Index";
import SelfEmployedsPage from "./pages/self_employeds/Index";
import ContactPage from "./pages/contact/Index";

// Pages
import HomePage from "./pages/home/Index";

// Addons
import { ToastContainer } from "react-toastify";
import { useAuth } from './hooks/useAuth';
import CompanyDetailPage from "./pages/companies/CompanyDetailPage";
import SelfEmployedsDetailPage from "./pages/self_employeds/SelfEmployedsDetailPage";
import FavoritesPage from "./pages/favorites/Index";

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
                    <Route path="/perfil" element={
                        user ? <UserProfile /> : <Navigate to="/login" replace />
                    } />
                    <Route path="/editar-perfil" element={
                        user ? <EditProfile /> : <Navigate to="/login" replace /> // Nova rota
                    } />
                    <Route path='*' element={<HomePage />} />

                    <Route path='/empresas' element={<CompaniesPage />} />
                    <Route path='/empresas/:id' element={<CompanyDetailPage /> } />
                    <Route path='/prestador-servicos' element={<SelfEmployedsPage />} />
                    <Route path='/prestador-servicos/:id' element={<SelfEmployedsDetailPage />} />
                    <Route path='/favoritos' element={<FavoritesPage />} />
                    <Route path='/contato' element={<ContactPage />} />
                </Routes>

                <ToastContainer />
                <Footer />

                <WhatsAppWidget
                    phoneNumber="XXXXXXXXXX"
                />
            </div>
        </Router>
    );
}

export default App;
