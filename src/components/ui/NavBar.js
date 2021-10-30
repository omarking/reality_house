import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand text-light" to="/">
        Reality House
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarText"
        aria-controls="navbarText"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link text-light" to={{
              pathname:"/",
              hash:"#inicio"
            }}>
              Inicio <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to={{
              pathname:"/",
              hash:"#productos"
            }}>
              Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to={{
              pathname:"/",
              hash:"#contacto"
            }} >
              Contactos
            </Link>
          </li>
        </ul>
        <Link className="navbar-text text-light"
        to="/login">Iniciar Sesion</Link>
      </div>
    </nav>
    )
}
