import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CompanyDetail from "../../components/companies/CompanyDetail";

import companiesData from '../../mocks/companiesData.json';

const CompanyDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const company = companiesData.find(company => company.id === parseInt(id));

    if (!company) {
        return <h2>Empresa não encontrada</h2>;
    }

    const handleBackClick = () => {
        navigate('/empresas');
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