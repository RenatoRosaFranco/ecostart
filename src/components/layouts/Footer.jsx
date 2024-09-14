import React from 'react';
import { Link } from "react-router-dom";
import './Footer.scss';

const Footer = () => {
    return (
        <footer id="footer">
            <div className="container">
                <div className="row">
                    <div className="col-md-3">
                        <h4 className="bold">EcoStart</h4>
                        <ul className="list-unstyled links">
                            <li><Link to='/'>Site Institucional </Link></li>
                            <li><Link to='/'>Fale Conosco</Link></li>
                            <li><Link to='/'>Carreiras</Link></li>
                            <li><Link to='/'>Perguntas Frequentes</Link></li>
                            <li><Link to='/'>SAC</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4 className="bold">Descubra</h4>
                        <ul className="list-unstyled links">
                            <li><Link to='/'>Empresas</Link></li>
                            <li><Link to='/'>Prestadores de Serviço</Link></li>
                            <li><Link to='/'>Blog EcoStart</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <h4 className="bold">Social</h4>
                        <ul className="list-unstyled list-inline social-list">
                            <li>
                                <a href="https://facebook.com/ecostart" target="_blank"
                                   rel="noopener noreferrer">
                                    <i className="fab fa-facebook-f social-icon"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://twitter.com/ecostart" target="_blank"
                                   rel="noopener noreferrer">
                                    <i className="fab fa-twitter social-icon"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://youtube.com/ecostart" target="_blank"
                                   rel="noopener noreferrer">
                                    <i className="fab fa-youtube social-icon"></i>
                                </a>
                            </li>
                            <li>
                                <a href="https://instagram.com/ecostart" target="_blank"
                                   rel="noopener noreferrer">
                                    <i className="fab fa-instagram social-icon"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container" id="copyright">
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-5">
                                <p>&copy; 2024 - EcoStart - Todos os direitos reservados,
                                    <span className='bold'> SQUARE HOLDINGS</span>
                                </p>
                                <p>CNPJ 14.380.200/0001-21 / Candido Falcão, nº 1155, Centro
                                São Borja/RS - CEP 60670</p>
                            </div>

                            <div className="col-md-7">
                                <div className="text-right">
                                    <ul className="list-unstyled list-inline links">
                                        <li><Link to='/'>Termos e condições de uso</Link></li>
                                        <li><Link to='/'>Código de conduta</Link></li>
                                        <li><Link to='/'>Privacidade</Link></li>
                                        <li><Link to='/'>Dicas de segurança</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;