import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initialValues, SignInSchema } from "../../schemas/auth/SignInSchema";
import { signIn } from "../../services/AuthService";
import { toast } from 'react-toastify';

import './SignIn.scss';

const SignIn = () => {
    const handleSignIn = async (values, { resetForm }) => {
        let { email, password } = values;
        const result = await signIn(email, password);

        if (result.success) {
            toast.success(result.message);
            resetForm();
        } else {
            toast.error(result.message);
        }
    };

    return(
        <div className='container' id='signin'>
            <div className="row">
                <div className="col-md-12">
                    <h2 className='bold'>Login</h2>
                    <br />

                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignInSchema}
                        onSubmit={handleSignIn}
                    >
                        {() => (
                            <Form className='form-horizontal'>
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
                                        <ErrorMessage name="email"  component='div' className='text-danger' />
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
                                            Entrar
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default SignIn;