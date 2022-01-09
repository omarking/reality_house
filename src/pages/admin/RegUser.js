import React from "react";
import { useState } from "react/cjs/react.development";
import swal from "sweetalert";
import InputComponent from "../../components/general/InputComponent";
import { handlePost } from "../../functions/axiosPost";

export const RegUser = () => {
  const [validate, setValidate] = useState(false);
  const [dataReg, setDataReg] = useState({
    nombre: "",
    apellidoUno: "",
    apellidoDos: "",
    tienda: "",
    correo: "",
    telefono: "",
    contrasena: ""
  });

  const handleInputChange = ({ target }) => {
    setDataReg({
      ...dataReg,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidateForm();
  };

  const handleValidateForm = () => {
    if(dataReg.nombre.length > 0 && dataReg.apellidoUno.length > 0 && dataReg.apellidoDos.length > 0 && dataReg.tienda.length > 0 && dataReg.correo.length > 0 && dataReg.telefono.length > 0 && dataReg.contrasena.length > 0){
      handleSendData();
    }else{
      handleChangeValidate();
    }
  };

  const handleSendData = () => {
    const f = new FormData();
    f.append('p', 'regUser');
    const resp = handlePost(f);
    resp.then((res)=>{
      if(res.data === true){
        swal({
          title: "Exito",
          text: "Usuario Guardado correctamente",
          icon: 'success'
        })
      }else{
        swal({
          title: "Error",
          text: "Ha ocurrido un error, vuelva a intentarlo",
          icon: 'error'
        })
      }
    });
  };

  const handleChangeValidate = () => {
    setValidate(true);
    setTimeout(()=>{setValidate(false)}, 1200);
  }

    
  return (
        <form
          onSubmit={handleSubmit}
          className="col-10 col-md-6 m-auto form-register"
          style={{ overflowY: "scroll", overflowX: "hidden", height: "500px" }}
        >
          <h3 className="mt-2">Registro de Usuario</h3>

          <InputComponent
            nombre="nombre"
            type="text"
            value={dataReg.nombre}
            funcion={handleInputChange}
            placeHolder="Nombre"
          />

          <InputComponent
            nombre="apellidoUno"
            type="text"
            value={dataReg.apellidoUno}
            funcion={handleInputChange}
            placeHolder="Primer apellido"
          />

          <InputComponent
            nombre="apellidoDos"
            type="text"
            value={dataReg.apellidoDos}
            funcion={handleInputChange}
            placeHolder="Segundo Apellido"
          />

          <InputComponent
            nombre="tienda"
            type="text"
            value={dataReg.tienda}
            funcion={handleInputChange}
            placeHolder="Nombre tienda"
          />

          <InputComponent
            nombre="correo"
            type="email"
            value={dataReg.correo}
            funcion={handleInputChange}
            placeHolder="Correo Electronico"
          />

          <InputComponent
            nombre="telefono"
            type="number"
            value={dataReg.telefono}
            funcion={handleInputChange}
            placeHolder="Telefono"
          />

          <InputComponent
            nombre="contrasena"
            type="password"
            value={dataReg.contrasena}
            funcion={handleInputChange}
            placeHolder="Contrasena"
          />

{
            validate &&
            (<p className="alert alert-danger my-4" role="alert">
            Rellene todos los campos
          </p>)
          }

          <div className="col-12 my-4 d-flex justify-content-around">
            <button className="btn color-components col-4">Agregar</button>
            <button className="btn color-components col-4">Cancelar</button>
          </div>
        </form>
  );
};
