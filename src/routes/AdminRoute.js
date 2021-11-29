import React, { useContext } from "react";
import { Redirect, Switch } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import Footer from "../components/ui/Footer";
import { NavBar } from "../components/ui/NavBar";
import { GeneradorQr } from "../pages/admin/GeneradorQr";
import { Index } from "../pages/admin/Index";
import { PerfilVendedor } from "../pages/admin/PerfilVendedor";
import { RegistroUsuario } from "../pages/admin/RegistroUsuario";
import { PrivateAdminRoute } from "./PrivateAdminRoute";

export const AdminRoute = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <NavBar />
      <Switch>
        <PrivateAdminRoute
          exact
          path="/admin"
          component={Index}
          isAuthenticated={user.logged}
          rol={user.status}
        />
        <PrivateAdminRoute
          exact
          path="/admin/vendedor"
          component={PerfilVendedor}
          isAuthenticated={user.logged}
          rol={user.status}
        />
        <PrivateAdminRoute
          exact
          path="/admin/generador-qr"
          component={GeneradorQr}
          isAuthenticated={user.logged}
          rol={user.status}
        />
        <PrivateAdminRoute
          exact
          path="/admin/registro-usuario"
          component={RegistroUsuario}
          isAuthenticated={user.logged}
          rol={user.status}
        />
        <Redirect to="/" />
      </Switch>
      <Footer />
    </div>
  );
};
