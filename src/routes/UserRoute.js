import React, { useContext } from "react";
import { Redirect, Switch } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import Footer from "../components/ui/Footer";
import { NavUser } from "../components/ui/NavUser";
import { AgregarProducto } from "../pages/user/AgregarProducto";
import { Catalogo } from "../pages/user/Catalogo";
import { Editar } from "../pages/user/Editar";
import { FormPass } from "../pages/user/FormPass";
import { Index } from "../pages/user/Index";
import { Perfil } from "../pages/user/Perfil";
import { PrivateUserRoute } from "./PrivateUserRoute";

export const UserRoute = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <NavUser />
      <Switch>
        <PrivateUserRoute exact path="/user" component={Index} isAuthenticated={user.logged} rol={user.status} />
        <PrivateUserRoute exact path="/user/mis-productos" component={Catalogo} isAuthenticated={user.logged} rol={user.status} />
        <PrivateUserRoute exact path="/user/perfil" component={Perfil} isAuthenticated={user.logged} rol={user.status} />
        <PrivateUserRoute exact path="/user/agregar" component={AgregarProducto} isAuthenticated={user.logged} rol={user.status} />
        <PrivateUserRoute exact path="/user/editar/:codigoProducto" component={Editar} isAuthenticated={user.logged} rol={user.status} />
        <PrivateUserRoute exact path="/user/cambio-pass" component={FormPass} isAuthenticated={user.logged} rol={user.status} />
        <Redirect to="/" />
      </Switch>
      <Footer/>
    </>
  );
};
