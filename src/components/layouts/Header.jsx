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
                            <li><Link to='/empresas'>Empresas</Link></li>
                            <li><Link to='/prestador-servicos'>Prestadores de Serviço</Link></li>
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
                                        <Link to='/login'>Entrar</Link>
                                    </li>
                                    <li>
                                        <Link to='/criar-conta'>Criar Conta</Link>
                                    </li>
                                </>
                            )}
                            {user && (
                                <>
                                    <li>
                                        <Link to='/'>
                                            <i className="fa-solid fa-graduation-cap" style={{ marginRight: 8 }}></i>
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
                                            <i className="fa-solid fa-circle-user" style={{ marginRight: 8 }}></i>
                                            Perfil <span className="caret"></span>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to='/meus-produtos'>
                                                    <i className="fas fa-shopping-cart"></i>
                                                    Meus Produtos
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/meus-servicos'>
                                                    <i className="fas fa-briefcase"></i>
                                                    Meus Serviços
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/minhas-avaliacoes'>
                                                    <i className="fas fa-star"></i>
                                                    Minhas Avaliações
                                                </Link>
                                            </li>
                                            <div className='divider' />
                                            <li>
                                                <Link to='/perfil'>
                                                    <i className="fas fa-user"></i>
                                                    Meu Perfil
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/editar-perfil'>
                                                    <i className="fas fa-edit"></i>
                                                    Editar Perfil
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/favoritos'>
                                                    <i className="fas fa-heart"></i>
                                                    Favoritos
                                                </Link>
                                            </li>
                                            <div className='divider' />
                                            <li>
                                                <Link to='/ajuda'>
                                                    <i className="fas fa-question-circle"></i>
                                                    Ajuda
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/seguranca'>
                                                    <i className="fas fa-lock"></i>
                                                    Segurança
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='#' onClick={handleLogout}>
                                                    <i className="fas fa-power-off"></i>
                                                    Sair
                                                </Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <button
                                            className="btn btn-link navbar-btn"
                                            onClick={handleLogout}
                                        >
                                            <i className="fas fa-power-off" style={{ marginRight: 5 }}></i>
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