import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ClientRoute } from "./ClientRoute";
import { LoginRoute } from "./LoginRoute";
import { UserRoute } from "./UserRoute";

export const AppRoute = () => {
  return (
    <Router>
      <Switch>
        <Route path="/user" component={UserRoute} />
        <Route path="/login" component={LoginRoute} />
        <Route path="/" component={ClientRoute} />
      </Switch>
    </Router>
  );
};
