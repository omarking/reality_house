import React from 'react'
import { Redirect, Route, Switch } from 'react-router';
import { NavBar } from '../components/ui/NavBar';
import { Index } from '../pages/client/Index';


export const ClientRoute = () => {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route exact path="/" component={Index} />
                <Redirect to="/" />
            </Switch>
        </>
    )
}
