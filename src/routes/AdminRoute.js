import React from 'react'
import { Redirect, Route, Switch } from 'react-router'
import Footer from '../components/ui/Footer'
import { NavBar } from '../components/ui/NavBar'
import { GeneradorQr } from '../pages/admin/GeneradorQr'
import { Index } from '../pages/admin/Index'
import { PerfilVendedor } from '../pages/admin/PerfilVendedor'
import { RegistroUsuario } from '../pages/admin/RegistroUsuario'

export const AdminRoute = () => {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route exact path="/admin/vendedor" component={PerfilVendedor} />
                <Route exact path="/admin/generador-qr" component={GeneradorQr} />
                <Route exact path="/admin/registro-usuario" component={RegistroUsuario} />
                <Route exact path="/admin" component={Index} />
                <Redirect to="/" />
            </Switch>
            <Footer />
        </div>
    )
}
