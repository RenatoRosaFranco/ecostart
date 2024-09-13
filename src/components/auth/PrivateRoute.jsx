import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const { user } = useAuth();

    return (
        <Route
            {...rest}
            element={user ? <Navigate to="/" replace /> : <Component />}
        />
    );
};

export default PrivateRoute;