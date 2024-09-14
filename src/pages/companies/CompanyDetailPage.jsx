import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getCompanyProfile } from "../../business/company";
import CompanyDetail from "../../components/companies/CompanyDetail";

import { toast } from "react-toastify";
import rollbar from "../../config/rollbar";

const CompanyDetailPage = () => {
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompany = async () => {
            setLoading(true);

            try {
                const result = await getCompanyProfile(id);

                if (result.success) {
                    setCompany(result.company);
                } else {
                    setError(result.message);
                }
            } catch (error) {
                toast.error('Erro ao buscar empresa.');
                rollbar.error('Erro ao buscar empresa:', error);
                setError('Erro ao buscar empresa.');
            } finally {
                setLoading(false);
            }
        }

        fetchCompany();
    }, [id]);

    const handleBackClick = () => {
        navigate('/empresas');
    }

    if (loading) {
        return <h2>Carregando...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>
    }

    if (!company) {
        return <h2>Empresa não encontrada</h2>;
    }

    return (
        <section id="content">
            <div className="container">
                <div className="row">
                    <CompanyDetail
                        company={company}
                        handleBackClick={handleBackClick}
                    />
                </div>
            </div>
        </section>
    );
}

export default CompanyDetailPage;