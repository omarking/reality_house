import React from "react";
import { Redirect, Route, Switch } from "react-router";
import { NavBar } from "../components/ui/NavBar";
import { FormPass } from "../pages/general/FormPass";
import { Login } from "../pages/general/Login";

export const LoginRoute = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/login/recuperar" component={FormPass} />
        <Redirect to="/" />
      </Switch>
    </>
  );
};
