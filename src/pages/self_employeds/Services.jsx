import React, { useState, useEffect } from 'react';
import Service from "../../components/services/Service";
import './Services.scss';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getServicesByUser } from "../../business/service";
import { getCurrentUser } from "../../utils/userUtils";
import ReactPaginate from 'react-paginate';

const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const servicesPerPage = 2;

    const navigate = useNavigate();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const user = await getCurrentUser();
                const response = await getServicesByUser(user.uid, currentPage + 1, servicesPerPage);

                console.log(response);

                if (response.success) {
                    setServices(response.services);
                    setTotalPages(response.totalPages);
                } else {
                    toast.error('Erro ao buscar serviços, tente novamente.');
                }
            } catch (error) {
                console.log('Erro ao buscar serviços:', error);
                toast.error(`Erro ao buscar serviços: ${error}`);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, [currentPage]);

    const handleAddService = () => {
        navigate('/adicionar-servico');
    };

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    if (loading) {
        return <p>Carregando serviços..</p>;
    }

    return (
        <section id="services-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <button
                            style={{ zIndex: 999 }}
                            onClick={handleAddService}
                            className='btn btn-primary btn-lg pull-right'
                        >
                            Adicionar Serviço
                        </button>

                        <h2>Serviços <span className='bold'>Anunciados</span></h2>
                        <p>Serviços anunciados por <span className='bold'>você</span> na plataforma.</p>
                        <hr />

                        {services.length > 0 ? (
                            <div className='row'>
                                {services.map(service => (
                                    <Service key={service.id} service={service} />
                                ))}
                            </div>
                        ) : (
                            <p className='well text-center'>
                                Você ainda não anunciou nenhum serviço,
                                vamos <a href='' className='bold'>anunciar?</a>
                            </p>
                        )}

                        <div className="text-center" id="pagination">
                            <ReactPaginate
                                previousLabel={"Anterior"}
                                nextLabel={"Próxima"}
                                breakLabel={"..."}
                                pageCount={totalPages}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageChange}
                                containerClassName={"pagination"}
                                activeClassName={"active"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesPage;