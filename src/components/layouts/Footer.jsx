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
                        <ul className="list-unstyled">
                            <li><Link to='/'>Site Institucional </Link></li>
                            <li><Link to='/'>Fale Conosco</Link></li>
                            <li><Link to='/'>Carreiras</Link></li>
                            <li><Link to='/'>Empresas</Link></li>
                            <li><Link to='/'>Prestadores de Serviço</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-3">
                        <h4 className="bold">Descubra</h4>
                        <ul className="list-unstyled">
                            <li><Link to='/'>Para Empresas</Link></li>
                            <li><Link to='/'>Para Prestadores</Link></li>
                            <li><Link to='/'>Blog EcoStart</Link></li>
                        </ul>
                    </div>

                    <div className="col-md-6">
                        <h4 className="bold">Social</h4>
                        <ul className="list-unstyled list-inline">

                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;