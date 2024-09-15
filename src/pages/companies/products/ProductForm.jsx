import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { productSchema } from "../../../schemas/productSchema";

export const ProductForm = ({ initialValues, onSubmit, submitButtonText }) => {
    return(
        <Formik
            initialValues={initialValues}
            validationSchema={productSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <div className='form-group'>
                        <label htmlFor="name">Nome:</label>
                        <Field
                            type="text"
                            id="name"
                            name="name"
                            className='form-control'
                            placeholder="Digite o nome do produto"
                        />
                        <ErrorMessage name="name" component="div"/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="description">Descrição:</label>
                        <Field
                            as="textarea"
                            id="description"
                            name="description"
                            className='form-control no-resize'
                            placeholder="Digite a descrição do produto"
                        />
                        <ErrorMessage name="description" component="div"/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="price">Preço:</label>
                        <Field
                            type="number"
                            id="price"
                            name="price"
                            className='form-control'
                            placeholder="Digite o preço do produto"
                        />
                        <ErrorMessage name="price" component="div"/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="category">Categoria:</label>
                        <Field as="select" id="category" name="category" className='form-control'>
                            <option value="">Selecione uma categoria</option>
                            <option value="Categoria 1">Categoria 1</option>
                            <option value="Categoria 2">Categoria 2</option>
                            <option value="Categoria 3">Categoria 3</option>
                        </Field>
                        <ErrorMessage name="category" component="div"/>
                    </div>

                    <div className='form-group'>
                        <label htmlFor="stock">Estoque:</label>
                        <Field
                            type="number"
                            id="stock"
                            name="stock"
                            className='form-control'
                            placeholder="Digite a quantidade em estoque"
                        />
                        <ErrorMessage name="stock" component="div"/>
                    </div>

                    <br />
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'Processando...' : submitButtonText}
                    </button>
                </Form>
            )}
        </Formik>
    )
};

export default ProductForm;