import React from 'react';
import { Link } from "react-router-dom";
import './style.scss';

const FavoritesPage = () => {
    return(
        <section id="favorites-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="bold text-center">Nenhum resultado encontrado</h4>
                        <p className='text-center'>Voltar para a Home</p>
                        <br />

                        <div className="text-center">
                            <Link to='/' className='bold'>
                                Voltar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FavoritesPage;