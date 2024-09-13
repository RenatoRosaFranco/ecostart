import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import SelfEmployedDetail from "../../components/self_employeds/SelfEmployedDetail";
import selfEmployedsData from '../../mocks/selfEmployedsData.json';

const SelfEmployedsDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const selfEmployed = selfEmployedsData.find(selfEmployed => selfEmployed.id === parseInt(id)); // Parse the id

    if (!selfEmployed) {
        return <h2>Prestador de serviço não encontrado</h2>;
    }

    const handleBackClick = () => {
        navigate('/prestador-servicos');
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