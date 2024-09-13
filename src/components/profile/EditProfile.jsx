import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, firestore } from "../../config/firebase";
import {toast} from "react-toastify";

const EditProfile = () => {
    const [profile, setProfile] = useState({ name: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;

            if (!user) {
                const profileDoc = await getDoc(doc(firestore, 'profiles', user.uid));
                if (profileDoc.exists()) {
                    setProfile(profileDoc.data());
                }
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

        if (!user) {
            try {
                await updateDoc(doc(firestore, 'profiles', user.uid), {
                    name: profile.name,
                });

                toast.success('Perfil atualizado com sucesso!');
            } catch (error) {
                toast.error('Erro ao atualizar o perfil');
            }
        }
    };

    if (loading) {
        return(
            <p>Carregando...</p>
        );
    }

    return (
        <div className='container'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className='bold'>Editar Perfil</h1>
                    <br />

                    <form>
                        <div>
                            <label>Nome:</label>
                            <input
                                type="text"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                            />
                        </div>

                        <br />
                        <button type="button" className='btn btn-primary btn-md' onClick={handleSave}>Salvar</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditProfile;