import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import InputComponent from "../../components/general/InputComponent";
import { handlePost } from "../../functions/axiosPost";

export const EditarUser = () => {
  const history = useHistory();
  const {usuario: vendedor} = useParams();
  const [validate, setValidate] = React.useState(false);
  const [data, setData] = React.useState({
    id: "",
    nombre: "",
    apellidoUno: "",
    apellidoDos: "",
    tienda: "",
    correo: "",
    telefono: "",
  });

  const handleGetData = () => {
      const f = new FormData();
      f.append('p', 'getInfoUser'); 
      f.append('idUser', vendedor);
      const resp = handlePost(f);
      resp.then(res => {
          const info = res.data;
        setData({
            id: info.usuario,
            nombre: info.nombreUsuario,
            apellidoUno: info.apellidoUnoUsuario,
            apellidoDos: info.apellidoDosUsuario,
            tienda: info.nombreTienda,
            correo: info.emailUsuario,
            telefono: info.telefonoUsuario,
        })
      });
  }

  const handleInputChange = ({ target }) => {
    setData({
      ...data,
      [target.name]: target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidateForm();
  };

  const handleValidateForm = () => {
    if(data.nombre.length > 0 && data.apellidoUno.length > 0 && data.apellidoDos.length > 0 && data.correo.length > 0 && data.telefono.length > 0){
      handleSendData();
    }else{
      handleChangeValidate();
    }
  };

  const handleSendData = () => {
    const f = new FormData();
    f.append('p', 'changeUser');
    let claves =  Object.keys(data);
    claves.forEach(x => {
        f.append(x, data[x])
    });
    const resp = handlePost(f);
    resp.then((res)=>{
      const respuesta = res.data;
      if(respuesta){
          history.push("/admin");
          swal({
              title: "Usuario Actualizado",
              icon: "success"
          })
      }else{
          swal({
              title: "Error",
              title: "Ocurrio un error, vuelva a intentarlo",
              icon: "error"
          })
      }
    });
  };

  const handleChangeValidate = () => {
    setValidate(true);
    setTimeout(()=>{setValidate(false)}, 1200);
  }


  useEffect(()=>{
      handleGetData();
  },[]);

    
  return (
        <form
          onSubmit={handleSubmit}
          className="col-10 col-md-6 m-auto form-register"        >
          <h3 className="mt-2">Registro de Usuario</h3>

          <InputComponent
            nombre="nombre"
            type="text"
            value={data.nombre}
            funcion={handleInputChange}
            placeHolder="Nombre"
          />

          <InputComponent
            nombre="apellidoUno"
            type="text"
            value={data.apellidoUno}
            funcion={handleInputChange}
            placeHolder="Primer apellido"
          />

          <InputComponent
            nombre="apellidoDos"
            type="text"
            value={data.apellidoDos}
            funcion={handleInputChange}
            placeHolder="Segundo Apellido"
          />

        <div className="col-lg col-12-md">
        <label className="ml-2" > Tienda </label>
        <input
          disabled
          value={data.tienda}
          onChange={handleInputChange}
          name="tienda"
          placeholder="Nombre Tienda"
          className="form-control"
        />
      </div>

        <div className="col-lg col-12-md">
        <label className="ml-2" > Correo </label>
        <input
          disabled
          value={data.correo}
          onChange={handleInputChange}
          name="correo"
          placeholder="email@email.com"
          className="form-control"
        />
      </div>    

          <InputComponent
            nombre="telefono"
            type="number"
            value={data.telefono}
            funcion={handleInputChange}
            placeHolder="Telefono"
          />

{
            validate &&
            (<p className="alert alert-danger my-4" role="alert">
            Rellene todos los campos
          </p>)
          }

          <div className="col-12 my-4 d-flex justify-content-around">
            <button className="btn color-components col-4">Guardar</button>
            <Link to="/admin" className="btn color-components col-4">Cancelar</Link>
          </div>
        </form>
  );
};
