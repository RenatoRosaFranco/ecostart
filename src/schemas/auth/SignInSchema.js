import * as Yup from 'yup';

export const initialValues = {
    email: '',
    password: ''
}

export const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Email inválido')
        .required('E-mail é obrigatório'),
    password: Yup.string().min(6, 'A senha deve ter pelo menos  6 caracteres')
        .required('Senha é obrigatória'),
});