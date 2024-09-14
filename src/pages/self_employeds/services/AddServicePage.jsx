import React from 'react';
import { useNavigate } from "react-router-dom";
import { initialValues } from "../../../schemas/serviceSchema";

import { createService } from "../../../business/service";
import { toast } from "react-toastify";
import ServiceForm from "./ServiceForm";

const AddServicePage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await createService(values);

            if (response.success) {
                toast.success('Serviço criado com sucesso!');
                navigate('/meus-servicos');
            } else {
                toast.error('Erro ao criar o serviço.');
            }
        } catch (error) {
            toast.error('Erro ao criar o serviço');
        } finally {
            setSubmitting(false);
        }
    }

    return (
        <section className='add-service-page' style={{ paddingBottom: '50px' }}>>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="bold">Adicionar serviço</h2>
                        <p>Preencha o formulário abaixo para cadastrar um novo serviço.</p>
                        <br />

                        <ServiceForm
                            initialValues={initialValues}
                            onSubmit={handleSubmit}
                            submitButtonText='Criar Serviço'
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddServicePage;