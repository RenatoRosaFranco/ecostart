import React from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import { initialValues, contactSchema } from "../../schemas/contactSchema";
import { toast } from "react-toastify";

import './ContactForm.scss';

const ContactForm = () => {
    return (
        <div className="contact-form">
            <Formik
                initialValues={initialValues}
                validationSchema={contactSchema}
                onSubmit={(values, {resetForm}) => {
                    toast.success('Mensagem enviada com sucesso!')
                    console.log(values);
                    resetForm();
                }}
            >
                {() => (
                    <Form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label><br />
                            <Field type="text" id="name" name="name" className="form-control" placeholder="Digite o Nome" required />
                            <ErrorMessage name="name" component="div" className="error-message"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Telefone</label><br />
                            <Field type="text" id="phone" name="phone" className="form-control" placeholder="Digite o Telefone" required />
                            <ErrorMessage name="phone" component="div" className="error-message"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label><br />
                            <Field type="email" id="email" name="email" className="form-control" placeholder="Digite o Email" required />
                            <ErrorMessage name="email" component="div" className="error-message"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="subject">Assunto</label><br />
                            <Field type="text" id="subject" name="subject" className="form-control" placeholder="Digite o Assunto" required />
                            <ErrorMessage name="subject" component="div" className="error-message"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="message">Mensagem</label><br />
                            <Field as="textarea" id="message" name="message" className="form-control no-resize" placeholder="Digite o Mensagem" required />
                            <ErrorMessage name="message" component="div" className="error-message"/>
                        </div>

                        <button
                            className='btn btn-primary btn-md'
                            type="submit"
                        >Enviar Mensagem</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ContactForm;