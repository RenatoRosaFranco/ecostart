import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import SelfEmployedDetail from "../../components/self_employeds/SelfEmployedDetail";
import {toast} from "react-toastify";
import rollbar from "../../config/rollbar";
import {getSelfEmployedProfile} from "../../business/self_employed";

const SelfEmployedsDetailPage = () => {
    const [selfEmployed, setSelfEmployed] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSelfEmployed = async () => {
            setLoading(true);

            try {
                const result = await getSelfEmployedProfile(id);

                if (result.success) {
                    setSelfEmployed(result.selfEmployed);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                toast.error('Erro ao buscar Prestador de serviço.');
                rollbar.error('Erro ao buscar Prestador de serviço:', error);
                setError('Erro ao buscar Prestador de serviço.');
            } finally {
                setLoading(false);
            }
        }

        fetchSelfEmployed();
    }, [id]);


    const handleBackClick = () => {
        navigate('/prestador-servicos');
    }

    if (loading) {
        return <h2>Carregando...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>
    }

    if (!selfEmployed) {
        return <h2>Prestador de serviço não encontrado</h2>;
    }

    return (
        <section id='content'>
            <div className="container">
                <div className="row">
                    <SelfEmployedDetail
                        selfEmployed={selfEmployed}
                        handleBackClick={handleBackClick}
                    />
                </div>
            </div>
        </section>
    );
};

export default SelfEmployedsDetailPage;