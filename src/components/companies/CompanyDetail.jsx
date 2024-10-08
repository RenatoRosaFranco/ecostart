import React from 'react';
import './CompanyDetail.scss';

const CompanyDetail = ({ company, handleBackClick }) => {
    let { name, image, description, rating } = company;

    return(
        <div className='company-detail'>
            <div className="col-md-12">
                <button
                    onClick={handleBackClick}
                    className="btn btn-primary">
                    Voltar
                </button>

                <div className="company-detail">
                    <h2>{name}</h2>
                    <img src={image} alt={name}/>
                    <p>{description}</p>
                    <p>⭐ {rating}</p>
                </div>
            </div>
        </div>
    )
};

export default CompanyDetail;