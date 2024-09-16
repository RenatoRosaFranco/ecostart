import React from 'react';
import './SelfEmployedDetail.scss';
import {avatar} from "../../utils/userUtils";
import Review from "../reviews/Review";

const SelfEmployedDetail = ({ selfEmployed, handleBackClick }) => {
    let { name, image, description, rating } = selfEmployed;

    const reviews = [
        {
            reviewerName: "João Silva",
            rating: 5,
            content: "Ótimo serviço, recomendo!",
            date: "2023-09-10"
        },
        {
            reviewerName: "Maria Oliveira",
            rating: 4,
            content: "Muito bom, mas poderia ser mais rápido.",
            date: "2023-09-12"
        }
        ];

    return(
        <div className='self-employed-detail'>
            <div className="col-md-12">
                <button
                    onClick={handleBackClick}
                    className="btn btn-primary">
                    Voltar
                </button>
                <hr/>
            </div>

            <div className='col-md-12'>
                <div className='panel panel-default'>
                    <div className="panel-body">
                        <div className="col-md-9">
                            <img src={avatar()} alt={name} className='avatar' style={{ marginTop: 30 }}/>

                            <div className="col-md-7">
                                <h2 className='bold'>{name}</h2>
                                <p>{description}</p>
                                <ul className="list-unstyled list-inline" style={{ marginTop: 20, marginBottom: 20 }}>
                                    <li style={{ marginRight: 5 }}>
                                        <i className="fa-brands fa-facebook"></i>
                                    </li>
                                    <li style={{ marginRight: 5 }}>
                                        <i className="fa-brands fa-instagram"></i>
                                    </li>
                                    <li style={{ marginRight: 5 }}>
                                        <i className="fa-solid fa-link"></i>
                                    </li>
                                    <li style={{ marginRight: 5 }}>
                                        <i className="fa-regular fa-envelope"></i>
                                    </li>
                                </ul>
                                <p>
                                    <span className="star">⭐</span>
                                    <span className="star">⭐</span>
                                    <span className="star">⭐</span>
                                    <span className="star">⭐</span>
                                    <span className="star">⭐</span>
                                </p>
                            </div>
                        </div>

                        <div className="col-md-3 text-center">
                            <button
                                style={{marginTop: 18, width: 250}}
                                className='btn btn-default btn-lg'
                            >
                                <i className="fa-regular fa-heart" style={{marginRight: 10}}></i>
                                Adicionar aos Favoritos
                            </button>

                            <button
                                style={{ marginTop: 10, width: 250 }}
                                className='btn btn-primary btn-lg'
                            >
                                <i className="fa-brands fa-whatsapp" style={{marginRight: 10}}></i>
                                Enviar Mensagem
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="panel panel-default">
                    <div className="panel-body" style={{paddingLeft: 30}}>
                        <h3 className='bold'>Produtos</h3>
                        <p>Conheça os produtos do prestador <span className="bold">{name}</span></p>
                        <hr/>

                        { }
                        <p className="well text-center">
                            Nenhum produto encontrado.
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-6">
                <div className="panel panel-default">
                    <div className="panel-body" style={{paddingLeft: 30}}>
                        <h3 className='bold'>Serviços</h3>
                        <p>Conheça os serviços do prestador <span className="bold">{name}</span></p>
                        <hr/>

                        <p className="well text-center">
                            Nenhum serviço encontrado.
                        </p>
                    </div>
                </div>
            </div>

            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-body" style={{paddingLeft: 30}}>
                        <h3 className='bold'>
                            <span>{reviews.length} </span>
                            Avaliações
                        </h3>

                        <p>Avaliações do prestador <span className="bold">{name}</span></p>
                        <hr/>

                        { reviews.length > 0 ? (
                            reviews.map(review => (
                                <Review review={review} />
                            ))
                        ) : (
                            <p className="well text-center">
                                Este usuário ainda não possui avaliações.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelfEmployedDetail;