import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { logout } from '../../services/AuthService';
import { toast } from 'react-toastify';

import './Header.scss';

const Header = () => {
    const [user, setUser] = useState(null);
    const [isSticky, setIsSticky] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup on unmount
        return () => window.removeEventListener('scroll', handleScroll);
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
            <nav className={`navbar navbar-default${isSticky ? ' sticky' : ''}`}>
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand bold" to="/">EcoStart</Link>
                    </div>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            <li><Link to={'/empresas'}>Empresas</Link></li>
                            <li><Link to={'/prestador-servicos'}>Prestadores de Serviço</Link></li>
                        </ul>

                        <form className="navbar-form navbar-left" role="search">
                            <div className="form-group">
                                <div className="input-group">
                                    <input type="text" className="form-control"
                                           placeholder="Busque por serviço ou comércio"/>
                                    <div className="input-group-addon">
                                        <i className="fas fa-search"></i>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div className="nav navbar-nav navbar-right">
                            {!user && (
                                <>
                                    <li>
                                        <Link to={'/login'}>Entrar</Link>
                                    </li>
                                    <li>
                                        <Link to={'/criar-conta'}>Criar Conta</Link>
                                    </li>
                                </>
                            )}
                            {user && (
                                <>
                                    <li>
                                        <Link to='/'>
                                            Aprenda
                                        </Link>
                                    </li>
                                    <li className="dropdown">
                                        <button
                                            className="btn btn-link navbar-btn dropdown-toggle"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            Perfil <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><Link to={'/meus-produtos'}>Meus Produtos</Link></li>
                                            <li><Link to={'/meus-servicos'}>Meus Serviços</Link></li>
                                            <li><Link to={'/minhas-avaliacoes'}>Minhas Avaliações</Link></li>
                                            <hr/>
                                            <li><Link to={'/perfil'}>Meu Perfil</Link></li>
                                            <li><Link to={'/editar-perfil'}>Editar Perfil</Link></li>
                                            <li><Link to={'/favoritos'}>Favoritos</Link></li>
                                            <hr/>
                                            <li><Link to={'/ajuda'}>Ajuda</Link></li>
                                            <li><Link to={'/seguranca'}>Segurança</Link></li>
                                            <li><Link to='#' onClick={handleLogout}>Sair</Link></li>
                                        </ul>
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