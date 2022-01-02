import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import InputComponent from "../../components/general/InputComponent";
import InputImage from "../../components/general/InputImage";
import SelectComponent from "../../components/general/SelectComponent";
import { handlePost } from "../../functions/axiosPost";
import { useForm } from "../../hooks/useForm";

export const AgregarProducto = ({history}) => {
  const { user } = useContext(AuthContext);
  const [validate, setValidate] = useState(false);
  const [category, setCategory] = useState([]);
  const [ruta, setRuta] = useState({
    ruta1:
      "https://cdn.pixabay.com/photo/2016/04/12/22/35/watercolour-1325656_960_720.jpg",
    ruta2:
      "https://cdn.pixabay.com/photo/2016/04/12/22/35/watercolour-1325656_960_720.jpg",
    ruta3:
      "https://cdn.pixabay.com/photo/2016/04/12/22/35/watercolour-1325656_960_720.jpg",
    ruta4:
      "https://cdn.pixabay.com/photo/2016/04/12/22/35/watercolour-1325656_960_720.jpg",
  });
  const [formValues, handleInputChange, handleInputFile] = useForm({
    nombre: "",
    stock: "",
    precio: "",
    marca: "",
    descripcion: "",
    categoria: "",
    ruta1: "",
    ruta2: "",
    ruta3: "",
    ruta4: "",
  });
  const {nombre, stock, precio, marca, descripcion, categoria, ruta1, ruta2, ruta3, ruta4} = formValues;

  const handleGetCategory = () => {
    const p = new FormData();
    p.append("p", "query");
    p.append("w", "category");
    const resp = handlePost(p);
    resp.then((res) => {
      setCategory(res.data);
    });
  };

  const handleImage = (e) => {
    const objectURL = URL.createObjectURL(e.target.files[0]);
    setRuta({
      ...ruta,
      [e.target.name]: objectURL,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleValidateForms();
  };

  const handleValidateForms = () => {
    if (Object.keys(formValues).length < 10) {
      handleChangeValidate();
    } else {
      if(nombre.length > 0 && stock.length > 0 && precio.length > 0 && marca.length > 0 && descripcion.length > 0 && categoria.length > 0 && ruta1 !== undefined && ruta2 !== undefined && ruta3 !== undefined && ruta4 !== undefined){
        handleSendData();
      }else{
        handleChangeValidate();
      }
    }
  };

  const handleChangeValidate = () => {
    setValidate(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setValidate(false);
    }, 5000);
  };

  const handleSendData = () => {
    const f = new FormData();
    f.append( 'p', 'saveProduct' );
    f.append( 'u', user.tienda);
    let claves = Object.keys(formValues);
        for(let i = 0; i< claves.length ; i++){
          let clave = claves[i];
          f.append(clave, formValues[clave]);
        }
    const response = handlePost(f);
    response.then(res => {
      if(res.data === "Ok"){
        history.replace("/user/mis-productos");
      }else{
        handleChangeValidate();
      }
    });
  };

  useEffect(() => {
    handleGetCategory();
  }, []);

  return (
    <div>
      <h2 className="w-75 mx-auto mb-4">Agregar Producto</h2>

      {validate && (
        <div className="alert alert-danger w-75 mx-auto" role="alert">
          Rellene todos los campos
        </div>
      )}

      <form onSubmit={handleSubmit} className="w-75 m-auto">
        <div className="row my-4">
          <InputComponent
            nombre="nombre"
            type="text"
            value={nombre}
            funcion={handleInputChange}
            placeHolder="Nombre Producto"
          />

          <InputComponent
            nombre="marca"
            type="text"
            value={marca}
            funcion={handleInputChange}
            placeHolder="Marca del producto"
          />
        </div>

        <div className="row my-4">
          <InputComponent
            nombre="stock"
            type="number"
            value={stock}
            funcion={handleInputChange}
            placeHolder=""
          />

          <InputComponent
            nombre="precio"
            type="number"
            value={precio}
            funcion={handleInputChange}
            placeHolder=""
          />
        </div>

        {/* Imagenes */}
        <div className="row justify-content-between">
          <div className="col-12">
            <label className="my-4">Seleccione Imagenes</label>
          </div>

          <InputImage
            id="file1"
            nombre="ruta1"
            handleChangeUrl={handleImage}
            handleValueImage={handleInputFile}
            url={ruta.ruta1}
          />

          <InputImage
            id="file2"
            nombre="ruta2"
            handleChangeUrl={handleImage}
            handleValueImage={handleInputFile}
            url={ruta.ruta2}
          />

          <InputImage
            id="file3"
            nombre="ruta3"
            handleChangeUrl={handleImage}
            handleValueImage={handleInputFile}
            url={ruta.ruta3}
          />

          <InputImage
            id="file4"
            nombre="ruta4"
            handleChangeUrl={handleImage}
            handleValueImage={handleInputFile}
            url={ruta.ruta4}
          />
        </div>

        {/* Select Categorias */}
        <div className="row my-4">
          <SelectComponent
            nombre="categoria"
            data={category}
            funcion={handleInputChange}
          />

          <div className="col-lg col-12-md">
            <label className="ml-2">
              Descripcion <small className="text-danger">*</small>
            </label>
            <textarea
              className="form-control"
              name="descripcion"
              value={descripcion || ""}
              onChange={handleInputChange}
              rows="4"
              style={{ resize: "none" }}
            ></textarea>
          </div>
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
