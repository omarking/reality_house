import md5 from "md5";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import InputComponent from "../../components/general/InputComponent";
import { handlePost } from "../../functions/axiosPost";

export const RegAdmin = () => {
  const history = useHistory();
  const [validate, setValidate] = React.useState(false);
  const [dataReg, setDataReg] = React.useState({
    nombre: "",
    apellidoUno: "",
    apellidoDos: "",
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
    if(dataReg.nombre.length > 0 && dataReg.apellidoUno.length > 0 && dataReg.apellidoDos.length > 0 && dataReg.correo.length > 0 && dataReg.telefono.length > 0 && dataReg.contrasena.length > 0){
      handleSendData();
    }else{
      handleChangeValidate();
    }
  };

  const handleSendData = () => {
    const f = new FormData();
    f.append('p', 'regAdmin');
    let claves =  Object.keys(dataReg);
    claves.forEach(x => {
      if(x === 'contrasena'){
        f.append(x, md5(dataReg[x]))
      }else{
        f.append(x, dataReg[x])
      }
    });
    const resp = handlePost(f);
    resp.then((res)=>{
       if(res.data === false){
        swal({
          title: "Exito",
          text: "Usuario Guardado correctamente",
          icon: 'success'
        });
        history.push('/admin');
      }else{
        swal({
          title: "Error",
          text: "Ha ocurrido un error, vuelva a intentarlo o asegurese de que el usuario no alla sido registrado anteriormente",
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
          <h3 className="mt-2">Registro de Administrador</h3>

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
            <Link to="/admin" className="btn color-components col-4">Cancelar</Link>
          </div>
        </form>
  );
};
