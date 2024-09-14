import React, {useEffect, useState} from 'react';
import SelfEmployed from '../../components/self_employeds/SelfEmployed';
import { getSelfEmployedsProfiles } from "../../business/self_employed";
import './style.scss';
import rollbar from "../../config/rollbar";
import {toast} from "react-toastify";
import Company from "../../components/companies/Company";

const SelfEmployedsPage = () => {
    const [selfEmployeds, setSelfEmployeds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSelfEmployeds = async () => {
            try {
                const response = await getSelfEmployedsProfiles();
                if (response.success) {
                    setSelfEmployeds(response.selfEmployeds);
                } else {
                    toast.error('Erro ao buscar prestadores de serviço, tente novamente.');
                    setError(response.message || 'Erro ao buscar prestadores.');
                }
            } catch(error) {
                setError(error);
                rollbar.error('Erro ao buscar prestadores de serviço:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchSelfEmployeds();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <>{error}</>;

    return (
        <section id="self-employeds-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Buscando por <span className="bold">Serviços</span></h3>
                        <p>Descubra <span className="bold">prestadores de serviços</span> próximo de você.</p>
                        <hr/>

                        <div className="row">
                            {selfEmployeds.length > 0 ? (
                                selfEmployeds.map(company => (
                                    <Company company={company} key={company.id}/>
                                ))
                            ) : (
                                <div className="col-md-12">
                                    <p className='text-center well'>
                                        Nenhuma empresa encontrada.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SelfEmployedsPage;