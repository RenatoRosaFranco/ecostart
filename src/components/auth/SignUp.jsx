import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import { initialValues, SignUpSchema } from '../../schemas/auth/SignUpSchema';
import { signUp } from "../../services/AuthService";
import { toast } from 'react-toastify';

import './SignUp.scss';

const SignUp = () => {
    const [documentMask, setDocumentMask] = useState('999.999.999-99');
    const [documentHint, setDocumentHint] = useState('Digite o CPF')
    const [phoneMask, setPhoneMask] = useState('(99) 99999-9999');

    const handleSignUp = async (values, { resetForm }) => {
        let { name, email, password, document_number, account_type, phone_number } = values;
        const result = await signUp(name, email, phone_number, document_number, account_type, password);

        if (result.success) {
            toast.success(result.message);
            resetForm();
        } else {
            toast.error(result.message);
        }
    };

    const handleAccountTypeChange = (e, setFieldValue) => {
        const accountType = e.target.value;
        setFieldValue('account_type', accountType);

        if (accountType === "self_employed") {
            setDocumentMask('999.999.999-99');
            setDocumentHint('Digite o CPF');
        } else {
            setDocumentMask('99.999.999/9999-99');
            setDocumentHint('Digite o CNPJ');
        }
    };

    return (
        <div className='container' id='signup'>
            <div className="row">
                <div className="col-md-12">
                    <h2 className='bold'>Cadastro</h2>
                    <br />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignUpSchema}
                        onSubmit={handleSignUp}
                    >
                        {({ setFieldValue }) => (
                            <Form className='form-horizontal'>
                                <div className="form-group">
                                    <label htmlFor='name' className='col-sm-2 control-label'>Nome:</label>
                                    <div className="col-sm-10">
                                        <Field
                                            type="text"
                                            placeholder='Digite o nome'
                                            id="name"
                                            name="name"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="name" component='div' className='text-danger'/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor='phone_number' className='col-sm-2 control-label'>Telefone:</label>
                                    <div className="col-sm-10">
                                        <Field name="phone_number">
                                            {({field}) => (
                                                <InputMask
                                                    {...field}
                                                    mask={phoneMask}
                                                    className="form-control"
                                                    placeholder='Digite o telefone'
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="phone_number" component='div' className='text-danger'/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor='email' className='col-sm-2 control-label'>Email:</label>
                                    <div className="col-sm-10">
                                        <Field
                                            type="email"
                                            placeholder='Digite o e-mail'
                                            id="email"
                                            name="email"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="email" component='div' className='text-danger'/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor='document_number'
                                           className='col-sm-2 control-label'>CPF/CNPJ:</label>
                                    <div className="col-sm-10">
                                        <Field name="document_number">
                                            {({field}) => (
                                                <InputMask
                                                    {...field}
                                                    mask={documentMask}
                                                    className="form-control"
                                                    placeholder={documentHint}
                                                />
                                            )}
                                        </Field>
                                        <ErrorMessage name="document_number" component='div' className='text-danger'/>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className='col-sm-2 control-label'>Tipo de Conta:</label>
                                    <div className="col-sm-10">
                                        <div className="radio">
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="account_type"
                                                    value="company"
                                                    onChange={(e) => handleAccountTypeChange(e, setFieldValue)}
                                                />
                                                Empresa
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>
                                                <Field
                                                    type="radio"
                                                    name="account_type"
                                                    value="self_employed"
                                                    onChange={(e) => handleAccountTypeChange(e, setFieldValue)}
                                                />
                                                Autônomo
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="col-sm-2 control-label">Senha:</label>
                                    <div className="col-sm-10">
                                        <Field
                                            type="password"
                                            placeholder='Digite a senha'
                                            id="password"
                                            name="password"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-2">
                                        <button type="submit" className="btn btn-primary">
                                            Criar minha conta
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default SignUp;