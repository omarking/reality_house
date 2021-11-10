import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import Footer from '../components/ui/Footer';
import { NavBar } from '../components/ui/NavBar';
import { Articulo } from '../pages/client/Articulo';
import { Index } from '../pages/client/Index';
import { Productos } from '../pages/client/Productos';

export const ClientRoute = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Index} />
                <Route exact path="/tienda" component={Productos} />
                <Route exact path="/tienda/producto" component={Articulo} />
                <Redirect to="/" />
            </Switch>
            <Footer/>
        </>
    )
}
