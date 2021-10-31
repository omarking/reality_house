import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Footer from "../components/ui/Footer";
import { NavBar } from "../components/ui/NavBar";
import { Catalogo } from "../pages/user/Catalogo";
import { Index } from "../pages/user/Index";
import { Perfil } from "../pages/user/Perfil";

export const UserRoute = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/user" component={Index} />
        <Route exact path="/user/mis-productos" component={Catalogo} />
        <Route exact path="/user/perfil" component={Perfil} />
        <Redirect to="/" />
      </Switch>
      <Footer/>
    </>
  );
};
