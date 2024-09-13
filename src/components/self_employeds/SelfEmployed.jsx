import React from 'react';
import { useNavigate } from "react-router-dom";
import './SelfEmployed.scss';

const SelfEmployed = ({ selfEmployed }) => {
    let { id, image, name, description, rating } = selfEmployed;
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/prestador-servicos/${id}`)
    }

    return(
        <div className='company-card col-md-4' key={id} onClick={handleClick}>
            <div className="panel panel-default">
                <div className="panel-body">
                    <img src={image} alt={name} className='company-image'/>
                    <div className="company-info">
                        <h3>{name}</h3>
                        <p>{description}</p>
                        <span className="company-rating">
                           ⭐ {rating}
                       </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelfEmployed;