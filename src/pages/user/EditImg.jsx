import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link} from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../auth/AuthContext";
import InputImage from "../../components/general/InputImage";
import { handlePost } from "../../functions/axiosPost";

export const EditImg = () => {
  const { user } = useContext(AuthContext);
  const history = useHistory();
  const [ruta, setRuta] = React.useState("");
  const [idUser, setIdUser] = React.useState("");
  const [datosForm, setDatosForm] = React.useState();

  const handleGetDataUser = () => {
    const f = new FormData();
    f.append("p", "getInfoUser");
    f.append("idUser", user.tienda);
    const resp = handlePost(f);
    resp.then((res) => {
      const data = res.data;
      setIdUser(data.usuario);
      setRuta(
        data.logoTienda === "" || data.logoTienda === null
          ? "./img/profile.png"
          : data.logoTienda
      );
    });
  };

  const handleInputImage = ({ target }) => {
    setDatosForm(target.files[0]);
  };

  const handleImgData = (e) => {
    const objetUrl = URL.createObjectURL(e.target.files[0]);
    setRuta(objetUrl);
  };

  const handleSendImg = () => {
    const f = new FormData();
    f.append('p', 'changeImgProfile');
    f.append('idUser', idUser);
    f.append('tienda', user.tienda);
    f.append('img', datosForm);
    const resp = handlePost(f);
    resp.then(res => {
      if(res.data === "exito"){
        history.push("/user/perfil");
        swal({
          title: "Exito",
          icon: "success"
        });
      }else{
        swal({
          title: "Error",
          text: "vuelva a intentarlo",
          icon: "error"
        });
      }
    });
  };

  const handleSubmit = () => {
    if(datosForm){
      handleSendImg();
    }
  };


  useEffect(() => {
    handleGetDataUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="w-75 mx-auto mb-4 justify-content-center">Cambiar Imagen de Perfil</h2>
        {/* Imagenes */}
        <div className="row justify-content-center">

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
          <button className="btn color-components mx-4" onClick={handleSubmit} >Agregar</button>
          <Link to="/user/perfil" className="btn color-components mx-4">
            Cancelar
          </Link>
        </div>
    </div>
  );
};
