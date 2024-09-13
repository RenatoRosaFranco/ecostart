import React from 'react';
import './Company.scss';

const Company = ({ company }) => {
    let { id, image, name, description, rating } = company;

    return(
        <div className='company-card col-md-4' key={id}>
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
    );
}

export default Company;