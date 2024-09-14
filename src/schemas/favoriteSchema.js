import * as Yup from 'yup';

export const initialValues = {
    itemId: '',
    itemType: 'service'
};

export const favoriteSchema = Yup.object().shape({
    itemId: Yup.string()
        .required('Item ID é obrigatório'),
    itemType: Yup.string()
        .oneOf(['service', 'product'], 'Tipo de item inválido')
        .required('Tipo de item é obrigatório'),
});
