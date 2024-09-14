import React, { useEffect, useState } from 'react';
import Company from "../../components/companies/Company";
import { getCompanyProfiles } from '../../business/company';
import './style.scss';

import rollbar from "../../config/rollbar";

import { toast } from "react-toastify";

const CompaniesPage = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await getCompanyProfiles();
                if (response.success) {
                    setCompanies(response.companies);
                } else {
                    toast.error('Erro ao buscar empresas, tente novamente.');
                    setError(response.message || 'Erro ao buscar empresas.');
                }
            } catch (error) {
                setError(error);
                rollbar.error('Erro ao buscar empresas:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCompanies();
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section id="companies-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Buscando por <span className="bold">Empresas</span></h3>
                        <p>Descubra <span className="bold">empresas e comércios</span> próximo de você.</p>
                        <hr/>

                        <div className="row">
                            {companies.length > 0 ? (
                                companies.map(company => (
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
}

export default CompaniesPage;