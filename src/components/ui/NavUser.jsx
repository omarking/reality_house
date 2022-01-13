import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const NavUser = () => {
  const history = useHistory();
  const {user, dispatch} = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({
      type: types.logout
    })
    history.replace("/")
    localStorage.removeItem('dateSesion');
  }


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
            <Link className="nav-link text-light" to="/user">
              Catalogo <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/user/mis-productos">
              Mis Productos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/user/perfil">
              Perfil
            </Link>
          </li>
        </ul>
          <div className="navbar-text text-light h-100 d-flex justify-content-center align-items-center" ><strong>{user.name}</strong></div>
          <button className="btn navbar-text text-light"
          onClick={()=>handleLogout()}
          >Cerrar Sesion</button>
        
      </div>
    </nav>
    )
}
