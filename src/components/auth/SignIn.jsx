import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { initialValues, SignInSchema } from "../../schemas/auth/SignInSchema";
import { signIn } from "../../services/AuthService";
import { toast } from 'react-toastify';

const SignIn = () => {
    const handleSignIn = async (values, { resetForm }) => {
        const result = await signIn(values.email, values.password);

        if (result.success) {
            toast.success(result.message);
            resetForm();
        } else {
            toast.error(result.message);
        }
    };

    return(
        <div className='container'>
            <div className="row">
                <div className="col-md-12">
                    <h2>Login</h2>
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
                                            id="password"
                                            name="password"
                                            className="form-control"
                                        />
                                        <ErrorMessage name="password" component="div" className="text-danger"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-10 col-sm-offset-2">
                                        <button type="submit" className="btn btn-primary">Login</button>
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