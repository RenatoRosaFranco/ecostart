import React from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { serviceSchema } from "../../../schemas/serviceSchema";

const ServiceForm = ({ initialValues, onSubmit, submitButtonText }) => {
    return(
        <Formik
            initialValues={initialValues}
            validationSchema={serviceSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className="form-group">
                        <label htmlFor="title">Título</label>
                        <Field type="text" name="title" className="form-control" placeholder='Digite o título' />
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
                        {isSubmitting ? 'Processando...' : submitButtonText}
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default ServiceForm;