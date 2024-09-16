import React from "react";
import './style.scss';

import Hero from "../../components/home/Hero";
import FooterBanner from "../../components/banners/FooterBanner";
import Item from "../../components/home/Item";
import Carrers from "../../components/home/Carrers";

const HomePage = () => {
    const companies = [
        {
            id: 1,
            name: "McDonald's",
            category: "Lanches"
        },
        {
            id: 2,
            name: 'Coco Bambu',
            category: "Frutos do Mar"
        },
        {
            id: 3,
            name: 'China in Box',
            category: 'Chinesa'
        },
        {
            id: 4,
            name: "Habib's",
            category: 'Lanches'
        }
    ];
    const products = [
            {
                id: 1,
                name: "Relógio Ben 10",
                category: "Magalu"
            },
            {
                id: 2,
                name: 'Oculos de Sol',
                category: "Chilli Beans"
            },
            {
                id: 3,
                name: 'Camisa Polo',
                category: 'Renner'
            },
            {
                id: 4,
                name: "Jaqueta Couro",
                category: 'Dudalina'
            }
        ];

    return(
        <div id='home-page'>
            <Hero />

            <div className="container" style={{ paddingTop: 60, paddingBottom: 60 }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="row">
                            <div className="col-md-4 col-md-offset-2">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h2 className="bold">Empresas</h2>

                                        <button className='btn btn-primary btn-md'>
                                            Ver Empresas
                                            <i className="fa-solid fa-chevron-right" style={{ marginLeft: 8 }}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-4">
                                <div className="panel panel-default">
                                    <div className="panel-body">
                                        <h2 className="bold">Produtos</h2>

                                        <button className='btn btn-primary btn-md'>
                                            Buscar produtos
                                            <i className="fa-solid fa-chevron-right" style={{ marginLeft: 8 }}></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-8 col-md-offset-2">

                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <h4 className="bold text-center">
                                                    Farmácia
                                                    <i className="fa-solid fa-chevron-right"
                                                       style={{marginLeft: 8}}></i>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <h4 className="bold text-center">
                                                    Bebidas
                                                    <i className="fa-solid fa-chevron-right"
                                                       style={{marginLeft: 8}}></i>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-4">
                                        <div className="panel panel-default">
                                            <div className="panel-body">
                                                <h4 className="bold text-center">
                                                    Petshop
                                                    <i className="fa-solid fa-chevron-right"
                                                       style={{marginLeft: 8}}></i>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Item kind='company' title='As melhores empresas' icon='fa-solid fa-certificate' collection={companies} />
            <Item kind='product' title='Os melhores produtos' icon='fa-brands fa-shopify' collection={products} />

            <section id="join-us">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">

                        </div>
                    </div>
                </div>
            </section>
            <Carrers />
            <FooterBanner/>
        </div>
    )
}

export default HomePage;