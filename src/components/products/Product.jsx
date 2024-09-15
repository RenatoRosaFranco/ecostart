import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../business/product";
import './Product.scss';

import { auth } from '../../config/firebase';
import rollbar from "../../config/rollbar";

import { toast } from "react-toastify";

const Product = ({ product }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleShow = () => {
        navigate(`/meus-produtos/${product.id}`);
    }

    const handleEdit = () => {
        navigate(`/meus-produtos/${product.id}/editar`);
    }

    const handleRemove = async () => {
        try {
            const response = await deleteProduct(product.id);

            if (response.success) {
                toast.success('Produto removido com sucesso!');
                navigate('/');
            } else {
                toast.error('Erro ao remover o produto.');
            }
        } catch (error) {
            rollbar.error('Erro ao remover produto:', error);
            toast.error('Erro ao remover produto.');
        }
    }

    return (
        <div key={product.id} className="product-item col-md-3">
            <div className="service-header">
                <h2>{product.name}</h2>
                {currentUser && currentUser.uid === product.ownerId && (
                    <>
                        <button className='edit-button' onClick={handleEdit}>
                            Editar
                        </button>

                        <button className="remove-button" onClick={handleRemove}>
                            Remover
                        </button>
                    </>
                )}
            </div>
            <p>{product.description}</p>
            <p><strong>Preço:</strong> {product.price}</p>
            <p><strong>Categoria:</strong> {product.category}</p>

            <button className="remove-button" onClick={handleShow}>
                Ver Mais
            </button>
        </div>
    );
}

export default Product;