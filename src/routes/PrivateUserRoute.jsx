import React from 'react'
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';

export const PrivateUserRoute = ({
    isAuthenticated,
    rol,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} 
        component={(props)=>(
            (isAuthenticated && rol === 'user') ?
            (<Component {...props} />)
            :
            (<Redirect to='/' />)
        )}
        />
    )
}

PrivateUserRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}