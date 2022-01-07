import React, { useContext } from "react";
import { Redirect, Switch } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import Footer from "../components/ui/Footer";
import { NavAdmin } from "../components/ui/NavAdmin";
import { AgregarQR } from "../pages/admin/AgregarQR";
import { GeneradorQr } from "../pages/admin/GeneradorQr";
import { Index } from "../pages/admin/Index";
import { PerfilVendedor } from "../pages/admin/PerfilVendedor";
import { RegistroUsuario } from "../pages/admin/RegistroUsuario";
import { PrivateAdminRoute } from "./PrivateAdminRoute";

export const AdminRoute = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <NavAdmin />
      <Switch>
        <PrivateAdminRoute exact path="/admin" component={Index} isAuthenticated={user.logged} rol={user.status}/>
        <PrivateAdminRoute exact path="/admin/generador-qr" component={GeneradorQr} isAuthenticated={user.logged} rol={user.status}/>
        <PrivateAdminRoute exact path="/admin/registro-usuario" component={RegistroUsuario} isAuthenticated={user.logged} rol={user.status}/>
        <PrivateAdminRoute exact path="/admin/:vendedor/:codigoProducto/agregar-qr" component={AgregarQR} isAuthenticated={user.logged} rol={user.status} />
        <PrivateAdminRoute exact path="/admin/:vendedor" component={PerfilVendedor} isAuthenticated={user.logged} rol={user.status}/>
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div> 
  );
};
