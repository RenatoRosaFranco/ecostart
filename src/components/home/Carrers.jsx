import React from 'react';

const Carrers = () => {
    return (
        <section id="carrers">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="col-md-4">
                            <h2 className="title bold">Quer transformar o futuro dos negócios locais?</h2>
                            <p className='description'>Descubra como é ser um Start e venha fazer
                                parte de nosso transformação.</p>
                            <br/>

                            <button className="btn btn-primary btn-lg">
                                Saiba mais
                            </button>
                        </div>

                        <div className="col-md-8">
                            <div className="jumbotron" style={{width: 597, height: 302}}></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default Carrers;