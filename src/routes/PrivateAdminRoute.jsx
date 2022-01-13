import React from 'react'
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

export const PrivateAdminRoute = ({
    isAuthenticated,
    rol,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} 
        component={(props)=>(
            (isAuthenticated && rol === 'admin') ?
            (<Component {...props} />)
            :
            (<Redirect to='/' />)
        )}
        />
    )
}

PrivateAdminRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}