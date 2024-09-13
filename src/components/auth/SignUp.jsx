import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initialValues, SignUpSchema } from '../../schemas/auth/SignUpSchema';
import { signUp } from "../../services/AuthService";

const SignUp = () => {
    const handleSignUp = async (values, { resetForm }) => {
        const result = await signUp(values.email, values.password);
        alert(result.message);

        if (result.success) {
            resetForm();
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12">
                    <h2>Cadastro</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={SignUpSchema}
                        onSubmit={handleSignUp}
                    >
                        {() => (
                            <Form className='form-horizontal'>
                                <div className="form-group">
                                    <label htmlFor='email' className='col-sm-2 control-label'>Email:</label>
                                    <div className="col-sm-10">
                                        <Field
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="email" component='div' className='text-danger' />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" className="col-sm-2 control-label">Senha:</label>
                                    <div className="col-sm-10">
                                        <Field
                                            type="password"
                                            id="password"
                                            name="password"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-2">
                                        <button type="submit" className="btn btn-primary">Cadastrar</button>
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