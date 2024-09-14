import React, {  useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from "../../config/firebase";
import Service from "../../components/services/Service";
import './Services.scss';

import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const servicesCollection = collection(firestore, 'services');
                const servicesSnapshot = await getDocs(servicesCollection);
                const servicesList = servicesSnapshot.docs.map(doc => ({
                    id: doc.id, ...doc.data(),
                }));

                setServices(servicesList);
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
                            <ul>
                                {services.map(service => (
                                    <Service key={service.id} service={service} />
                                ))}
                            </ul>
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