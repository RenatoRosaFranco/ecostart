import React, { useState, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { firestore, auth } from "../../config/firebase";
import { Link } from "react-router-dom";
import './style.scss';
import { toast } from "react-toastify";
import rollbar from "../../config/rollbar";

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadFavorites = async () => {
            const userId = auth.currentUser?.uid;

            if (!userId) {
                toast.error('Usuário não autenticado.');
                return;
            }

            try {
                const userFavoritesRef = doc(firestore, "favorites", userId);
                const docSnap = await getDoc(userFavoritesRef);

                if (docSnap.exists()) {
                    setFavorites(docSnap.data().favorites || []);
                } else {
                    setFavorites([]);
                }
            } catch (error) {
                toast.error('Erro ao carregar favoritos.');
                rollbar.error('Erro ao carregar favoritos:', error);
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, []);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const servicesRef = collection(firestore, 'services');
                const productsRef = collection(firestore, 'products');

                const [servicesSnapshot, productsSnapshot] = await Promise.all([
                    getDocs(servicesRef),
                    getDocs(productsRef),
                ]);

                const servicesList = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'service' }));
                const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), type: 'product' }));

                setItems([...servicesList, ...productsList]);
            } catch (error) {
                toast.error('Erro ao carregar itens');
                rollbar.error('Erro ao carregar itens:', error);
            }
        };

        fetchItems();
    }, []);

    const favoriteItems = items.filter(item =>
        favorites.some(fav => fav.itemId === item.id && fav.itemType === item.type)
    );

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <section id="favorites-page">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        {favoriteItems.length > 0 ? (
                            <>
                                <h4 className="bold text-center">Meus Favoritos</h4>
                                <ul className="list-unstyled">
                                    {favoriteItems.map(item => (
                                        <li key={item.id} className="favorite-item">
                                            <h5>{item.name}</h5>
                                            <p>Tipo: {item.type}</p>
                                            <Link to={`/${item.type}/${item.id}`} className="btn btn-primary">Ver Detalhes</Link>
                                        </li>
                                    ))}
                                </ul>
                            </>
                        ) : (
                            <>
                                <h4 className="bold text-center">Nenhum resultado encontrado</h4>
                                <p className='text-center'>Voltar para a Home</p>
                                <br />
                                <div className="text-center">
                                    <Link to='/' className='bold'>
                                        Voltar
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FavoritesPage;