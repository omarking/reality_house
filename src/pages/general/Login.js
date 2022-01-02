import axios from "axios";
import md5 from "md5";
import React, { useContext } from "react";
import { useState } from "react/cjs/react.development";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";

export const Login = ({ history }) => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [inputUser, setInputUser] = useState(false);
  const [inputPass, setInputPass] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (email.length === 0) {
      setInputUser(true);
      setTimeout(() => {
        setInputUser(false);
      }, 3000);
    }
    if (pass.length === 0) {
      setInputPass(true);
      setTimeout(() => {
        setInputPass(false);
      }, 3000);
    }
    if (email.length > 0 && pass.length > 0) {
      const u = new FormData();
      u.append('p', 'iniSesion');
      u.append('e', email);
      u.append('pass', md5(pass));
      const resp = await axios.post("http://localhost/Residencia/api/index.php", u, 
      {headers: { 'Content-Type': 'multipart/form-data' }});
      if (resp.data === "Error") {
        setError(true);
        setTimeout(()=>{setError(false)},3000);
      } else {
        const datos = resp.data[0];
        handleLoginSesion(datos);
      }
    }
  };

  const handleLoginSesion = (data) => {
    dispatch({
      type: types.login,
      payload: {
        name: data.nombre,
        status: data.rol,
        tienda: data.nombreTienda,
      },
    });
    history.replace(`/${data.rol}`);
    const date = new Date();
    const date2 = new Date(date.getTime() + 1800000);
    localStorage.setItem("dateSesion", date2);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPass(event.target.value);
  };

  return (
    <div>
      <div className="row border rounded w-75 h-75 mx-auto mt-5">
        <div className="img col-6 img-login border d-none d-md-block"></div>

        <form onSubmit={handleLogin} className="col-10 col-md-6 m-auto">
          <h5 className="mt-4">Bienvenido a Reality House</h5>
          <h3 className="mt-2">Iniciar Sesion</h3>
          <div className="form-group mt-5">
            <label>Correo Electronico:</label>
            {inputUser && (
              <small
                className="col-6 text-danger"
              >
                *Campo Vacio
              </small>
            )}
            <input
              type="email"
              placeholder="correo@correo.com"
              className="form-control col-6"
              value={email}
              onChange={handleEmail}
            />
          </div>

          <div className="form-group mt-2">
            <label>Contraseña</label>
            {inputPass && (
              <small
                className="col-6 text-danger"
              >
                *Campo Vacio
              </small>
            )}
            <input
              type="password"
              placeholder="Ingrese Contraseña"
              className="form-control col-6"
              value={pass}
              onChange={handlePassword}
            />
            <a className="col-6" href="#inicio">
              <small>Ha olvidado su contraseña?</small>
              <br/>
              {error && (
              <small
                className="text-danger col-8"
              >
                *Correo o contrasena incorrectos, verifique de nuevo.
              </small>
            )}
            </a>
          </div>

          <input
            type="submit"
            value="Ingresar"
            className="btn color-components col-4"
          />
          <p className="col-8 mt-3">
            Quieres tener una cuenta y vender tus productos,{" "}
            <a href="#contactanos">contactanos.</a>
          </p>
        </form>
      </div>
    </div>
  );
};
