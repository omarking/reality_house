import React from "react";
import { Redirect, Route, Switch } from "react-router";
import Footer from "../components/ui/Footer";
import { NavBar } from "../components/ui/NavBar";
import { AgregarProducto } from "../pages/user/AgregarProducto";
import { Catalogo } from "../pages/user/Catalogo";
import { FormPass } from "../pages/user/FormPass";
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
        <Route exact path="/user/agregar" component={AgregarProducto} />
        <Route exact path="/user/cambio-pass" component={FormPass} />
        <Redirect to="/" />
      </Switch>
      <Footer/>
    </>
  );
};
