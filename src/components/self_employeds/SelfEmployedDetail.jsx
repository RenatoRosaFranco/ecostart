import React from 'react';
import './SelfEmployedDetail.scss';

const SelfEmployedDetail = ({ selfEmployed, handleBackClick }) => {
    let { name, image, description, rating } = selfEmployed;

    return(
        <div className='self-employed-detail'>
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
}

export default SelfEmployedDetail;