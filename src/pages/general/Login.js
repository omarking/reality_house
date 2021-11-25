import React, { useContext } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const Login = ({history}) => {
  const {dispatch} = useContext(AuthContext);

  const handleLogin = () => {
    dispatch({
      type: types.login,
      payload: {
        name: 'Alan',
        status: 'user'
      }
    })
    history.replace("/user");
  }


  return (
    <div>
      <div className="row border rounded w-75 h-75 mx-auto mt-5">
        <div className="img col-6 img-login border d-none d-md-block"></div>

        <div className="col-10 col-md-6 m-auto">
          <h5 className="mt-4">Bienvenido a Reality House</h5>
          <h3 className="mt-2">Iniciar Sesion</h3>
          <div className="form-group mt-5">
            <label>Correo Electronico:</label>
            <input
              type="email"
              placeholder="correo@correo.com"
              className="form-control col-6"
            />
          </div>

          <div className="form-group mt-2">
            <label>Contraseña</label>
            <input type="password" placeholder="Ingrese Contraseña" className="form-control col-6" />
            <a className="col-6" href="#inicio"><small>Ha olvidado su contraseña?</small></a>
          </div>

        <button onClick={handleLogin} className="btn color-components col-4" >Ingresar</button>
        <p className="col-8 mt-3">Quieres tener una cuenta y vender tus productos, <a href="#contactanos">contactanos.</a></p>

        </div>
      </div>
    </div>
  );
};
