import * as Yup from 'yup';

export const initialValues = {
    name: '',
    description: '',
    price: '',
    category: '',
    stock: ''
}

export const productSchema = Yup.object().shape({
    name: Yup.string()
        .min(2,'O nome deve ter pelo menos 2 caracteres')
        .max(50, 'O nome pode ter no máximo 50 caracteres')
        .required('O nome é obrigatório'),
    description: Yup.string()
        .max(500, 'A descrição pode ter no máximo 500 caracteres')
        .required('A descrição é obrigatória'),
    price: Yup.number()
        .typeError('O preço deve ser um número')
        .positive('O preço deve ser um valor positivo')
        .required('O preço é obrigatório'),
    category: Yup.string()
        .oneOf(['Categoria 1', 'Categoria 2', 'Categoria 3'], 'Categoria inválida')
        .required('A categoria é obrigatória'),
    stock: Yup.number()
        .typeError('O estoque deve ser um número')
        .integer('O estoque deve ser um número inteiro')
        .min(0, 'O estoque não pode ser negativo')
        .required('O estoque é obrigatório')
});
