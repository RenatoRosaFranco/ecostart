import * as Yup from 'yup';

export const initialValues = {
    title: '',
    description: '',
    price: '',
    category: ''
}

export const serviceSchema = Yup.object().shape({
    title: Yup.string()
        .required('O título é obrigatório'),
    description: Yup.string()
        .required('A descrição é obrigatória'),
    price: Yup.number()
        .required('O preço é obrigatório'),
    category: Yup.string()
        .required('A categoria é obrigatória')
});