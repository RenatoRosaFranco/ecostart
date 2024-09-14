import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getServiceById } from "../../../business/service";
import { toast } from 'react-toastify';

const ServiceDetailPage = () => {
    const { serviceId } = useParams();
    const [service, setService] = useState(null);

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

    if (!service) {
        return <div>Carregando...</div>;
    }

    return (
        <section className='service-detail-page'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="bold">{service.title}</h2>
                        <p><strong>Descrição:</strong> {service.description}</p>
                        <p><strong>Preço:</strong> {service.price}</p>
                        <p><strong>Categoria:</strong> {service.category}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServiceDetailPage;