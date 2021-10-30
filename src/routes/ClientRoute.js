import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import { NavBar } from '../components/ui/NavBar';
import { Index } from '../pages/client/Index';
import { Productos } from '../pages/client/Productos';


export const ClientRoute = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/tienda" component={Productos} />
                <Redirect to="/" />
            </Switch>
        </>
    )
}
