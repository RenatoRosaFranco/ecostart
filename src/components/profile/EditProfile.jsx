import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../config/firebase";
import InputMask from 'react-input-mask';
import { Field, ErrorMessage } from 'formik'
import { toast } from "react-toastify";

import './EditProfile.scss';

const EditProfile = () => {
    const [profile, setProfile] = useState({ name: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;

            // Verifica se o usuário está autenticado
            if (user) {
                try {
                    const profileDoc = await getDoc(doc(firestore, 'profiles', user.uid));
                    if (profileDoc.exists()) {
                        setProfile(profileDoc.data());
                    } else {
                        toast.error('Perfil não encontrado.');
                    }
                } catch (error) {
                    toast.error('Erro ao buscar perfil.');
                    console.error('Erro ao buscar perfil:', error);
                }
            } else {
                toast.error('Usuário não autenticado.');
            }
            setLoading(false);
        }

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = async () => {
        const user = auth.currentUser;

        // Verifica se o usuário está autenticado
        if (user) {
            try {
                await updateDoc(doc(firestore, 'profiles', user.uid), {
                    name: profile.name,
                });

                toast.success('Perfil atualizado com sucesso!');
            } catch (error) {
                toast.error('Erro ao atualizar o perfil.');
                console.error('Erro ao atualizar o perfil:', error);
            }
        } else {
            toast.error('Usuário não autenticado.');
        }
    };

    if (loading) {
        return (
            <p>Carregando...</p>
        );
    }

    return (
        <div className='container' id='edit-profile'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className='bold'>Editar Perfil</h1>
                    <p>Atualize seus dados cadastrais.</p>
                    <br />

                    <form>
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="name"
                                className='form-control'
                                placeholder='Digite o nome'
                                value={profile.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <br />
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            Salvar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;