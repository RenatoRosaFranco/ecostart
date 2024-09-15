import React from 'react';
import { useNavigate } from "react-router-dom";
import { initialValues } from "../../../schemas/serviceSchema";

import {createProduct} from "../../../business/product";
import ProductForm from "./ProductForm";

import { toast } from "react-toastify";

const AddProductPage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await createProduct(values);

            if (response.success) {
                toast.success('Produto criado com sucesso!');
                navigate('/meus-produtos');
            } else {
                toast.error('Erro ao criar o produto.');
            }
        } catch (error) {
            toast.error('Erro ao criar o produto.');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className='add-service-page' style={{ paddingBottom: '50px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="bold">Adicionar Produto</h2>
                        <p>Preencha o formulário abaixo para cadastrar um novo produto.</p>
                        <hr />

                        <ProductForm
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            submitButtonText='Criar Produto'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddProductPage;