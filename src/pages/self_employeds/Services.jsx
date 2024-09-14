import React, {  useState, useEffect } from 'react';
import Service from "../../components/services/Service";
import './Services.scss';

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { getServicesByUser } from "../../business/service";
import { getCurrentUser } from "../../utils/userUtils";

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const user = await getCurrentUser();
                const response = await getServicesByUser(user.uid);

                if (response.success) {
                    setServices(response.services);
                } else {
                    toast.error('Erro ao buscar serviços, tente novamente.');
                }
            } catch (error) {
                console.log('Erro ao buscar serviços:', error);
                toast.error(`Erro ao buscar serviços: ${error}`);
            }  finally {
                setLoading(false)
            }
        };

        fetchServices();
    }, []);

    const handleAddService = () => {
        navigate('/adicionar-servico');
    }

    if (loading) {
        return <p>Carregando serviços..</p>;
    }

    return(
        <section id="services-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button
                            style={{ zIndex: 999 }}
                            onClick={handleAddService}
                            className='btn btn-primary btn-lg pull-right'
                        > Adicionar Serviço
                        </button>

                        <h2>Serviços <span className='bold'>Anunciados</span></h2>
                        <p>Serviços anunciados por <span className='bold'>você</span> na plataforma.</p>
                        <hr />

                        {services.length > 0 ? (
                            <div className='row'>
                                {services.map(service => (
                                    <Service key={service.id} service={service} />
                                ))}
                            </div>
                        ) : (
                            <p className='well text-center'>
                                Você ainda não anunciou nenhum serviço,
                                vamos <a href='' className='bold'>anunciar?</a>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesPage