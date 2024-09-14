import React from 'react';
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { initialValues, serviceSchema } from "../../../schemas/serviceSchema";

import { createService } from "../../../business/service";
import { toast } from "react-toastify";

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
        <section className='add-service-page'
            style={{ paddingBottom: '50px' }}>
        >
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="bold">Adicionar serviço</h2>
                        <p>Preencha o formulário abaixo para cadastrar um novo serviço.</p>
                        <br />

                        <Formik
                            initialValues={initialValues}
                            validationSchema={serviceSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form>
                                    <div className="form-group">
                                        <label htmlFor="title">Título</label>
                                        <Field type="text" name="title" className="form-control" placeholder='Digite o titulo' />
                                        <ErrorMessage name="title" component="div" className="error-message" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="description">Descrição</label>
                                        <Field as="textarea" name="description" className="form-control no-resize" placeholder='Digite a descrição' />
                                        <ErrorMessage name="description" component="div" className="error-message" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="price">Preço</label>
                                        <Field type="number" name="price" className="form-control" placeholder='Digite o preço' />
                                        <ErrorMessage name="price" component="div" className="error-message" />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="category">Categoria</label>
                                        <Field as="select" name="category" className="form-control">
                                            <option value="" label="Selecione uma categoria" />
                                            <option value="Tecnologia" label="Tecnologia" />
                                            <option value="Consultoria" label="Consultoria" />
                                            <option value="Design" label="Design" />
                                        </Field>
                                        <ErrorMessage name="category" component="div" className="error-message" />
                                    </div>

                                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                        {isSubmitting ? 'Criando...' : 'Criar Serviço'}
                                    </button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AddServicePage;