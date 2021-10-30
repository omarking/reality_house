import React from "react";
import { NavLink } from "react-router-dom";

export const CategoryBar = () => {
  return (
    <>
      <ul className="nav justify-content-center border h-50 rounded">
        <li className="nav-item">
          <NavLink className="nav-link" to="/tienda"  activeClassName="active">
            Sala
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink  className="nav-link" to="/tienda"  activeClassName="active">
            Cocina
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/tienda"  activeClassName="active">
            Comedor
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="/tienda"  activeClassName="active">
            Habitacion
          </NavLink>
        </li>
      </ul>
    </>
  );
};
