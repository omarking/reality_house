import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { NavBar } from "../components/ui/NavBar";
import { Login } from "../pages/general/Login";

export const LoginRoute = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
