import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, firestore } from "../../config/firebase";
import InputMask from 'react-input-mask';
import { toast } from "react-toastify";
import './EditProfile.scss';
import {getProfile, updateProfile} from "../../business/profile";

const EditProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;

            try {
                const result = await getProfile(user.uid);

                if (result.success) {
                    setProfile(result.data);
                } else {
                    toast.error(result.message);
                }
            } catch (error) {
                toast.error('Erro ao buscar perfil.');
                console.error('Erro ao buscar perfil:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = async () => {
        const user = auth.currentUser;

        try {
            const result = await updateProfile(user.uid, profile);

            if (result.success) {
                const updatedProfileDoc = await getDoc(doc(firestore, 'profiles', user.uid));
                setProfile(updatedProfileDoc.data());

                toast.success('Perfil atualizado com sucesso!');
            } else {
                toast.error(result.message);
            }
        } catch (error) {
            toast.error('Erro ao atualizar o perfil.');
            console.error('Erro ao atualizar o perfil:', error);
        }
    };

    if (loading) {
        return <p>Carregando...</p>;
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

                        <div>
                            <label>CPF/CNPJ:</label>
                            <InputMask
                                mask={profile.account_type === 'company' ? '99.999.999/9999-99' : '999.999.999-99'}
                                type="text"
                                name="document_number"
                                className="form-control"
                                placeholder="Digite seu CPF ou CNPJ"
                                value={profile.document_number}
                                disabled={true}
                                onChange={handleInputChange}
                            />
                        </div>
                        <br />

                        <div>
                            <label>Tipo de Conta:</label>
                            <select
                                name="account_type"
                                className="form-control"
                                value={profile.account_type}
                                onChange={handleInputChange}
                                disabled={true}
                            >
                                <option value="">Selecione o tipo de conta</option>
                                <option value="company">Empresa</option>
                                <option value="self_employed">Prestador de serviço</option>
                            </select>
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
