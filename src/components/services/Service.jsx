import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import { auth } from '../../config/firebase';
import './Service.scss';

import {toast} from "react-toastify";
import rollbar from "../../config/rollbar";
import {deleteService} from "../../business/service";

const Service = ({ service }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        });

        return () => unsubscribe();
    }, []);

    const handleShow = () => {
        navigate(`/meus-servicos/${service.id}`);
    }

    const handleEdit = () => {
        navigate(`/meus-servicos/${service.id}/editar`);
    }

    const handleRemove = async () => {
        try {
            const response = await deleteService(service.id);

            if (response.success) {
                toast.success('Serviço removido com sucesso!');
                navigate('/');
            } else {
                toast.error('Erro ao remover o serviço.');
            }
        } catch (error) {
            rollbar.error('Erro ao remover serviço:', error);
            toast.error('Erro ao remover serviço.');
        }
    }

    return (
        <div key={service.id} className="service-item col-md-3">
            <div className="service-header">
                <h2>{service.title}</h2>
                {currentUser && currentUser.uid === service.ownerId && (
                    <>
                        <button className='edit-button' onClick={handleEdit}>
                            Editar
                        </button>

                        <button className="remove-button" onClick={handleRemove}>
                            Remover
                        </button>
                    </>
                )}
            </div>
            <p>{service.description}</p>
            <p><strong>Preço:</strong> {service.price}</p>
            <p><strong>Categoria:</strong> {service.category}</p>

            <button className="remove-button" onClick={handleShow}>
                Ver Mais
            </button>
        </div>
    );
}

export default Service;