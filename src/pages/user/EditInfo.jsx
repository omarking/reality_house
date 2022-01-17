import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link} from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../auth/AuthContext";
import InputComponent from "../../components/general/InputComponent";
import InputImage from "../../components/general/InputImage";
import { handlePost } from "../../functions/axiosPost";

export const EditInfo = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();

  const [validate, setValidate] = React.useState(false);
  const [ruta, setRuta] = React.useState("");
  const [datosForm, setDatosForm] = React.useState({
    id: "",
    nombre: "",
    tienda: "",
    email: "",
    telefono: "",
    ruta: "",
  });

  const handleGetDataUser = () => {
    const f = new FormData();
    f.append("p", "getInfoUser");
    f.append("idUser", user.tienda);
    const resp = handlePost(f);
    resp.then((res) => {
      const data = res.data;
      console.log(res.data);
      setDatosForm({
        id: data.usuario,
        nombre: data.nombre,
        tienda: data.nombreTienda,
        email: data.emailUsuario,
        telefono: data.telefonoUsuario,
      });
      setRuta(
        data.logoTienda === "" || data.logoTienda === null
          ? "./img/profile.png"
          : data.logoTienda
      );
    });
  };

  const handleInputData = ({ target }) => {
    setDatosForm({
      ...datosForm,
      [target.name]: target.value,
    });
  };

  const handleInputImage = ({ target }) => {
    setDatosForm({
      ...datosForm,
      [target.name]: target.files[0],
    });
  };

  const handleImgData = (e) => {
    const objetUrl = URL.createObjectURL(e.target.files[0]);
    setRuta(objetUrl);
  };

  const handleValidateForms = () => {
      if(datosForm.tienda.length > 5 && datosForm.telefono.length >= 10 ){
        handleSendData();
      }else{
        handleChangeValidate();
      }
  }

  const handleChangeValidate = () => {
    setValidate(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setValidate(false);
    }, 5000);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      handleValidateForms();
  }

  const handleSendData = () => {
      const f = new FormData();
      f.append('p', 'changeDataUser');
      f.append('idUsuario', datosForm.id);
      f.append('tienda', datosForm.tienda);
      f.append('telefono', datosForm.telefono);
      f.append('img1', datosForm.ruta);
      const resp = handlePost(f);
      resp.then(res => {
          if(res.data === false){
            history.push("/user/perfil");
          }else{
            swal({
              title: "Error",
              text:"Ha ocurrido un error vuelva a intentarlo"
            })
          }
      });
  }

  useEffect(() => {
    handleGetDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="w-75 mx-auto mb-4">Editar Informacion</h2>
      {validate && (
        <div className="alert alert-danger w-75 mx-auto" role="alert">
          Rellene todos los campos
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-75 m-auto">
        <div className="row my-4">
        <div className="col-lg col-12-md">
            <label className="ml-2">Nombre</label>
            <input
              type="text"
              disabled
              value={datosForm.nombre}
              name="nombre"
              className="form-control"
            />
          </div>

          <InputComponent
            nombre="tienda"
            type="text"
            placeHolder="Las tres escobas"
            value={datosForm.tienda}
            funcion={handleInputData}
          />
        </div>

        <div className="row my-4">
          <InputComponent
            nombre="telefono"
            type="number"
            placeHolder=""
            value={datosForm.telefono}
            funcion={handleInputData}
          />

          <div className="col-lg col-12-md">
            <label className="ml-2">Email</label>
            <input
              type="text"
              disabled
              value={datosForm.email}
              name="email"
              placeholder="email@email.com"
              className="form-control"
            />
          </div>
        </div>

        {/* Imagenes */}
        <div className="row justify-content-between">
          <div className="col-12">
            <label className="my-4">Seleccione Imagen de perfil: </label>
          </div>

          <InputImage
            id="file1"
            nombre="ruta"
            url={ruta}
            handleChangeUrl={handleImgData}
            handleValueImage={handleInputImage}
          />
        </div>

        {/* Botones */}
        <div className="row justify-content-center my-4">
          <input
            type="submit"
            className="btn color-components mx-4"
            value="Agregar"
          />
          <Link to="/user/mis-productos" className="btn color-components mx-4">
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
};
