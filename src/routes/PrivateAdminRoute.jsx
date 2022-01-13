import React from 'react'
import { Redirect, Route } from 'react-router';
import PropTypes from 'prop-types';
import md5 from 'md5';

export const PrivateAdminRoute = ({
    isAuthenticated,
    rol,
    component: Component,
    ...rest
}) => {
    return (
        <Route {...rest} 
        component={(props)=>(
            (isAuthenticated && rol === md5('admin')) ?
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