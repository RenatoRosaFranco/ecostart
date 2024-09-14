import React, { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebase';
import { toast } from "react-toastify";

import './UserProfile.scss';

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;

            if (user) {
                try {
                    // Log do UID do usuário
                    console.log("Buscando perfil para o UID: ", user.uid);

                    // Busca do documento pelo UID
                    const profileDoc = await getDoc(doc(firestore, 'profiles', user.uid));

                    if (profileDoc.exists()) {
                        console.log("Perfil encontrado:", profileDoc.data());
                        setProfile(profileDoc.data());
                    } else {
                        // Verificação de UID manual, se necessário
                        toast.error('Perfil não encontrado.');
                        console.error("Nenhum documento encontrado para o UID:", user.uid);
                    }
                } catch (error) {
                    toast.error(error.message);
                    console.error("Erro ao buscar perfil:", error);
                }
            } else {
                toast.error('Usuário não autenticado.');
            }
            setLoading(false);
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <p>Carregando perfil...</p>;
    }

    return (
        <div id='user-profile' className='container'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className='bold'>Perfil do Usuário</h1>

                    {profile ? (
                        <div>
                            <p>Olá <span className='bold'>{profile.name}</span>, Bem-vindo ao seu perfil.</p>
                            <br />
                            <p><strong>Nome:</strong> {profile.name}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>CPF/CNPJ:</strong> {profile.document_number}</p>
                            <p><strong>Tipo de Conta:</strong> {profile.account_type}</p>
                        </div>
                    ) : (
                        <p>Perfil não encontrado.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;