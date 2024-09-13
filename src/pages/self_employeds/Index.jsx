import React, {useEffect, useState} from 'react';
import SelfEmployed from '../../components/self_employeds/SelfEmployed';
import './style.scss';

import selfEmployedsData from '../../mocks/selfEmployedsData.json';

const SelfEmployedsPage = () => {
    const [selfEmployeds, setSelfEmployeds] = useState([]);

    useEffect(() => {
        setSelfEmployeds(selfEmployedsData);
    }, []);

    return (
        <section id="self-employeds-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h3>Buscando por <span className="bold">Serviços</span></h3>
                        <p>Descubra <span className="bold">prestadores de serviços</span> próximo de você.</p>
                        <hr/>

                        <div className="row">
                            {selfEmployeds.map(selfEmployed => (
                                <SelfEmployed selfEmployed={selfEmployed} key={selfEmployed.id} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};

export default SelfEmployedsPage;