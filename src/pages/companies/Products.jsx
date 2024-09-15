import React, { useState, useEffect } from 'react';
import './Products.scss';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCurrentUser } from "../../utils/userUtils";
import {getProductsByUser} from "../../business/product";
import Product from "../../components/products/Product";

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const user = await getCurrentUser();
                const response = await getProductsByUser(user.uid);

                if (response.success) {
                    setProducts(response.products);
                } else {
                    toast.error('Erro ao buscar produtos, tente novamente.');
                }
            } catch (error) {
                console.log('Erro ao buscar :', error);
                toast.error(`Erro ao buscar produtos: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        navigate('/adicionar-produto');
    };

    if (loading) {
        return <p>Carregando produtos..</p>;
    }

    return (
        <section id="products-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button
                            style={{ zIndex: 999 }}
                            onClick={handleAddProduct}
                            className='btn btn-primary btn-lg pull-right'
                        >
                            Adicionar Produto
                        </button>

                        <h2>Produtos <span className='bold'>Publicados</span></h2>
                        <p>Produtos cadastrados por <span className='bold'>você</span> na plataforma.</p>
                        <hr />

                        {products.length > 0 ? (
                            <div className='row'>
                                {products.map(product => (
                                    <Product key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <p className='well text-center'>
                                Você ainda não anunciou nenhum produto,
                                vamos <a href='' className='bold'>anunciar?</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductsPage;