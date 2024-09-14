import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { initialValues } from '../../../schemas/serviceSchema';
import { getServiceById, updateService } from '../../../business/service';
import { toast } from 'react-toastify';
import ServiceForm from './ServiceForm';

const EditServicePage = () => {
    const { serviceId } = useParams();
    const [service, setService] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchService = async () => {
            try {
                const response = await getServiceById(serviceId);
                if (response.success) {
                    setService(response.service);
                } else {
                    toast.error(response.message || 'Erro ao carregar o serviço.');
                }
            } catch (error) {
                toast.error('Erro ao carregar o serviço.');
            }
        };

        fetchService();
    }, [serviceId]);

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            const response = await updateService(serviceId, values);

            if (response.success) {
                toast.success('Serviço atualizado com sucesso!');
                navigate('/meus-servicos');
            } else {
                toast.error('Erro ao atualizar o serviço.');
            }
        } catch (error) {
            toast.error('Erro ao atualizar o serviço');
        } finally {
            setSubmitting(false);
        }
    };

    if (!service) {
        return <div>Carregando...</div>;
    }

    return (
        <section className='edit-service-page' style={{ paddingBottom: '50px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="bold">Editar Serviço</h2>
                        <p>Preencha o formulário abaixo para atualizar o serviço.</p>
                        <br />

                        <ServiceForm
                            initialValues={{ ...initialValues, ...service }}
                            onSubmit={handleSubmit}
                            submitButtonText="Atualizar Serviço"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default EditServicePage;