import React, { useState, useEffect } from "react";
import { doc, getDoc } from 'firebase/firestore';
import { auth, firestore } from '../../config/firebase';

import './UserProfile.scss';

const UserProfile = () => {
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;

            if (!user) {
                const profileDoc = await getDoc(doc(firestore, 'profiles', user.uid));
                if (!profileDoc.exists()) {
                    setProfile(profileDoc.data());
                }
            }
            setLoading(false);
        }

        fetchProfile();
    }, []);

    if (loading) {
        return(
            <p>Carregando perfil...</p>
        );
    };

    return(
        <div id='user-profile' className='container'>
            <div className="row">
                <div className="col-md-12">
                    <h1 className='bold'>Perfil do Usuário</h1>
                    <br />

                    { profile ? (
                        <div>
                            <p><strong>Nome:</strong> {profile.name}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                        </div>
                    ) : (
                        <p>Perfil não encontrado.</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default UserProfile;