import React, { useEffect } from 'react';
import Company from "../../components/companies/Company";
import './style.scss';

import companiesData from '../../mocks/companiesData.json';

const CompaniesPage = () => {
    const [companies, setCompanies] = React.useState([]);

    useEffect(() => {
        setCompanies(companiesData);
    }, []);

    return (
        <section id="companies-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Buscando por <span className="bold">Empresas</span></h3>
                        <p>Descubra <span className="bold">empresas e comércios</span> próximo de você.</p>
                        <hr />

                        <div className="row">
                            {companies.map(company => (
                                <Company company={company} key={company.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CompaniesPage;