import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initialValues } from '../../../schemas/serviceSchema';

import {getProductById, updateProduct} from "../../../business/product";
import ProductForm from "./ProductForm";

import { toast } from 'react-toastify';

const EditProductPage = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await getProductById(productId);
                if (response.success) {
                    setProduct(response.product);
                } else {
                    toast.error(response.message || 'Erro ao carregar o produto.');
                }
            } catch (error) {
                toast.error('Erro ao carregar o produto.');
            }
        };

        fetchService();
    }, [productId]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await updateProduct(productId, values);

            if (response.success) {
                toast.success('Produto atualizado com sucesso!');
                navigate('/meus-produtos');
            } else {
                toast.error('Erro ao atualizar o produto.');
            }
        } catch (error) {
            toast.error('Erro ao atualizar o produto');
        } finally {
            setSubmitting(false);
        }
    };

    if (!product) {
        return <div>Carregando...</div>;
    }

    return (
        <section className='edit-service-page' style={{ paddingBottom: '50px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="bold">Editar Produto</h2>
                        <p>Preencha o formulário abaixo para atualizar o produto.</p>
                        <br />

                        <ProductForm
                            initialValues={{ ...initialValues, ...product }}
                            onSubmit={handleSubmit}
                            submitButtonText="Atualizar Serviço"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditProductPage;