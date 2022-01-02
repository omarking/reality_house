import md5 from "md5";
import React, { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../auth/AuthContext";
import { handlePost } from "../../functions/axiosPost";

export const Perfil = () => {
  const {user} = useContext(AuthContext)
  const [ usuario, setUsuario] = useState();

  const handleGetDataUser = () => {
    const f = new FormData();
    f.append('p', 'getInfoUser');
    f.append('idUser', user.tienda);
    const resp = handlePost(f);
    resp.then(res => {
      setUsuario(res.data);
    })
  }

  const handleShowIns = () => {
    swal({
      title: "Instrucciones",
      text: "Estas son las instrucciones para cambiar a Premium",
      button: "Aceptar"
    })
  }

  const handlePass = () =>{
    swal({
      title: 'Cambiar contrasena:',
      text: 'Contrasena actual',
      content: {
        element:"input",
        attributes: {
          placeholder: "Contrasena Actual",
          type: "password"
        }
      },
      buttons: ["Cancelar", "Continuar"]
    }).then( resp =>{
      if (resp){
        handleValidatePass(md5(resp));
      }
    })
  }

  const handleChangePass = (password) => {
    const f = new FormData();
    f.append('p', 'changePassword');
    f.append('e', usuario.emailUsuario);
    f.append('pass', password);
    const resp = handlePost(f);
    resp.then(res =>{
      if(res.data === false){
        swal({
          title: "Listo",
          text: "Contrasena cambiada correctamente",
          icon: "success"
        })
      }else{
        swal({
          title: "Error",
          text: "Vuelva a intentarlo",
          icon: "error"
        })
      }
    })
  }

  const handleValidatePass = (password) => {
    console.log(password)
    console.log(usuario.emailUsuario)
    const f = new FormData();
    f.append('p', 'iniSesion');
    f.append('e', usuario.emailUsuario);
    f.append('pass', password);
    const resp = handlePost(f);
    resp.then(res => {
      console.log(res.data)
      if(res.data === "Error"){
        swal({
          title: "Error",
          text: "vuelva a intentarlo",
          icon: "error"
        })
      }else{
        swal({
          title: "Contrasena confirmada:",
          text: "Ingrese la nueva contrasena con mas de 8 caracteres",
          icon: "success",
          content: {
            element:"input",
            attributes: {
              placeholder: "Contrasena Actual",
              type: "password"
            }
          },
          buttons: ["Cancelar", "Continuar"]
        }).then(res=>{
          if(res && res.length >= 8){
            handleChangePass(md5(res));
          }else{
            swal({
              title: "Error",
              text: "vuelva a intentarlo",
              icon: "error"
            })
          }
        });
      }
    })
  }

  useEffect(()=>{
    handleGetDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  return (
    <>
      {
        usuario && (
          <div>
            <div className="row mx-auto mt-3 justify-content-around">
        <div className="col-10 col-md-6 m-auto">
          <h3>Nombre: {usuario.nombre}</h3>
          <p>Tienda: {usuario.nombreTienda} </p>
          <p>Email: {usuario.emailUsuario} </p>
          <p>Telefono: {usuario.telefonoUsuario} </p>
          <button onClick={handlePass} className="btn color-components">Cambiar Contraseña</button>
        </div>

        <div className="col-10 col-md-2 m-auto">
          <div
            className="img-perfil rounded"
            style={{
              backgroundImage:
                `url("${usuario.logoTienda}")`,
            }}
          ></div>
          <button className="btn color-components">Cambiar Imagen</button>
        </div>
      </div>

      <hr className="my-4" />

      <div className=" row mx-auto mt-3 justify-content-around">
        <div className="col-10 col-md-4 mx-auto mb-4">
          <h3>Suscripcion:</h3>
          <h4>Estado: {usuario.membresia} </h4>
          {
            (usuario.membresia === "FREE") &&
              (<button onClick={handleShowIns} className="btn color-components">Cambiar a Premium</button>)
          }
          
        </div>

        <div className="row col-10 col-md-6 mx-auto border rounded">
          <div className="col-12 col-md-6">
            <h4>Free</h4>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uis uis-multiply text-danger"></i> Benefist
            </p>
            <p>
              <i className="uis uis-multiply text-danger"></i> Benefist
            </p>
            <p>
              <i className="uis uis-multiply text-danger"></i> Benefist
            </p>
          </div>
          <div className="col-12 col-md-6">
            <h4>Premium</h4>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
            <p>
              <i className="uil uil-check text-success"></i> Benefist
            </p>
          </div>
        </div>
      </div>
          </div>
        )
      }
    </>
  );
};
