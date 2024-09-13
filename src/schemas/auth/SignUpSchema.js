import * as Yup from 'yup';

export const initialValues = {
    name: '',
    email: '',
    password: '',
}

export const SignUpSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Nome muito curto!')
        .max(50, 'Nome muito longo!')
        .required('Nome é obrigatório'),
    email: Yup.string()
        .email('Email inválido')
        .required('Email é obrigatório'),
    password: Yup.string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('Senha é obrigatória'),
});