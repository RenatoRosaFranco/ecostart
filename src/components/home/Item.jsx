import React from 'react';
import {avatar} from "../../utils/userUtils";

const Companies = ({ collection, title }) => {
    return (
        <section id='companies'>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2 className="bold">{ title }</h2>
                        <br/>

                        <div className="row">
                            {collection.map(item => (
                                <div className="col-md-3">
                                    <div className="panel panel-default company">
                                        <div className="panel-body company-body">
                                            <i className="fa-solid fa-certificate pull-right company-verified"></i>

                                            <div className='company-details'>
                                                <img src={avatar()} alt='' className='company-avatar pull-left'/>
                                                <h4 className="company-name bold">{item.name}</h4>
                                                <p className='company-category'>{item.category}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Companies;