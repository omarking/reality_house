import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ClientRoute } from './ClientRoute';


export const AppRoute = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" component={ClientRoute} />
            </Switch>

        </Router>
    )
}
