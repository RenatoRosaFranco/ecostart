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
                        <Link className="navbar-brand" to="/">MeuApp</Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
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
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;