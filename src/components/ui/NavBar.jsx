import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const NavBar = () => {
  const history = useHistory();
  const {user:{logged}, dispatch} = useContext(AuthContext);
  const {user} = useContext(AuthContext);

    /* Destruye las variables del usuario y el estado de login */
  const handleLogout = () => {
    dispatch({
      type: types.logout
    })
    history.replace("/")
    localStorage.removeItem('dateSesion');
  }

  const handleRedirect = () => {
    history.push(`/${user.status}`)
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
              hash:"contacto"
            }} >
              Contactos
            </Link>
          </li>
        </ul>
       {
         logged ?
         (
          <div className='d-flex'>
            <button className="btn navbar-text text-light" onClick={handleRedirect} ><strong>Perfil</strong></button>
            <button className="btn navbar-text text-light"
          onClick={()=>handleLogout()}
          >Cerrar Sesion</button>
          </div>
          
         )
         :
         (
          <Link className="navbar-text text-light"
          to="/login">Iniciar Sesion</Link>
         )
       }
      </div>
    </nav>
    )
}
