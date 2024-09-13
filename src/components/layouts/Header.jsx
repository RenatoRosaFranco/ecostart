import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { logout } from '../../services/AuthService';
import { toast } from 'react-toastify';

import './Header.scss';

const Header = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        const result = await logout();

        if (result.success) {
            toast.success(result.message);
            navigate('/');
        } else {
            toast.error(result.message);
        }
    };

    return (
        <header id="header">
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand bold" to="/">EcoStart</Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to='/empresas'>Empresas</Link></li>
                            <li><Link to='/prestadores-servico'>Prestadores de Serviço</Link></li>
                            <li><Link to='/carreiras'>Carreiras</Link></li>
                            <li><Link to='/contato'>Fale Conosco</Link></li>
                        </ul>

                        <div className="nav navbar-nav navbar-right">
                            {!user && (
                                <>
                                    <li>
                                        <Link to="/login">Entrar</Link>
                                    </li>
                                    <li>
                                        <Link to="/criar-conta">Criar Conta</Link>
                                    </li>
                                </>
                            )}
                            {user && (
                                <>
                                    <li>
                                        <Link to='/perfil'>Meu Perfil</Link>
                                    </li>
                                    <li>
                                        <Link to='/editar-perfil'>Editar Perfil</Link>
                                    </li>
                                    <li>
                                        <button
                                            className="btn btn-link navbar-btn"
                                            onClick={handleLogout}
                                        >
                                            Sair
                                        </button>
                                    </li>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;