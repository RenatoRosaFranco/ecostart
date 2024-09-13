import React from 'react';
import './style.scss';

const Hero = () => {
    return (
        <section id="hero">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="bold text-center title">EcoStart</h1>
                        <p className='text-center description'>Encontre comércios e prestadores de serviços.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero;