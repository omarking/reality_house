import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../auth/AuthContext";
import InputComponent from "../../components/general/InputComponent";
import InputImage from "../../components/general/InputImage";
import { handlePost, urlServer } from "../../functions/axiosPost";

export const Editar = ({ history }) => {
  const { user } = useContext(AuthContext);
  const { codigoProducto } = useParams();

  /* States */
  const [validate, setValidate] = useState(false);
  const [category, setCategory] = useState([])
  const [datosForm, setDatosForm] = useState({});
  const [rutas, setRutas] = useState({});
  const [nombreProducto, setNombreProducto] = useState("");

  /* Obtenemos la informacion del producto */
  const handleGetData = () => {
    const f = new FormData();
    f.append("p", "getProductForId");
    f.append("s", user.tienda);
    f.append("id", codigoProducto);
    const resp = handlePost(f);
    resp.then((res) => {
      if (res.data[0] !== undefined) {
        const data = res.data[0];
        setDatosForm({
          nombre: data.nombreProducto,
          stock: data.stock,
          precio: data.precio,
          marca: data.nombreMarca,
          descripcion: data.descripcionProducto,
          categoria: data.categoria,
          ruta1: urlServer + data.imgPrincipal,
          ruta2: urlServer + data.img1,
          ruta3: urlServer + data.img2,
          ruta4: urlServer + data.img3,
        });
        setNombreProducto(data.nombreProducto);
        setRutas({
          ruta1: urlServer + data.imgPrincipal,
          ruta2: urlServer + data.img1,
          ruta3: urlServer + data.img2,
          ruta4: urlServer + data.img3,
        })
      } else {
        history.push  ("/");
      }
    });
  };

  /* Obtenemos las categorias */
  const handleGetCategory = () => {
    const p = new FormData();
    p.append("p", "query");
    p.append("w", "category");
    const resp = handlePost(p);
    resp.then((res) => {
      setCategory(res.data);
    });
  };

  /* Obtenemos y cambiamos la informacion de los inputs */
  const handleInputData = ({target}) => {
    setDatosForm({
      ...datosForm,
      [target.name]: target.value 
    });
  }

  /* Obtenemos y cambiamos la informacion de las imagenes de los inputs */
  const handleInputImage = ({target}) => {
    setDatosForm({
      ...datosForm,
      [target.name]: target.files[0],
    });
  }

  /* Creamos una url temporal para mostrarla en el componente de las imagenes */
  const handleImgData = (e) => {
    const objetUrl = URL.createObjectURL(e.target.files[0]);
    setRutas({
      ...rutas,
      [e.target.name]: objetUrl,
    })
  }

  const handleChangeValidate = () => {
    setValidate(true);
    window.scrollTo(0, 0);
    setTimeout(() => {
      setValidate(false);
    }, 5000);
  };

  /* Validamos que la informacion sea correcta antes de enviarla */
  const handleValidateForms = () => {
    if(Object.keys(datosForm).length < 10) {
      handleChangeValidate();
    }else{
      if(datosForm.nombre.length > 0 && datosForm.stock.length > 0 && datosForm.precio.length > 0 && datosForm.marca.length > 0 && datosForm.descripcion.length > 0 && datosForm.categoria.length > 0 && datosForm.ruta1 !== undefined && datosForm.ruta2 !== undefined && datosForm.ruta3 !== undefined && datosForm.ruta4 !== undefined){
        handleSendData();
      }else{
        handleChangeValidate();
      }
    }
  }


  const HandleSubmit = (e) => {
    e.preventDefault();
    handleValidateForms();
  }

  /* Mandamos la informacion actualizada */
  const handleSendData = () => {
    const f = new FormData();
    f.append('p', 'updateProduct');
    f.append('id', codigoProducto);
    f.append('tienda', user.tienda);
    f.append('nombreActual', nombreProducto);
    let claves = Object.keys(datosForm);
    for(let i = 0 ; i < claves.length ; i++ ){
      let clave = claves[i];
      f.append(clave, datosForm[clave]);
    }
    const response = handlePost(f);
    response.then( res => {
      if(res.data){
        history.replace('/user/mis-productos')
      }else{
        swal({
          title: "Error",
          text: "Ha ocurrido un error, intentelo de nuevo",
          button: "Aceptar"
        });
      }
    });
  }

  useEffect(() => {
    handleGetData();
    handleGetCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h2 className="w-75 mx-auto mb-4">Editar Producto</h2>
      {validate && (
        <div className="alert alert-danger w-75 mx-auto" role="alert">
          Rellene todos los campos
        </div>
      )}

      <form onSubmit={HandleSubmit} className="w-75 m-auto">
        <div className="row my-4">
          <InputComponent
            nombre="nombre"
            type="text"
            placeHolder="Nombre Producto"
            value={datosForm.nombre}
            funcion={handleInputData}
          />

          <InputComponent
            nombre="marca"
            type="text"
            placeHolder="Marca del producto"
            value={datosForm.marca}
            funcion={handleInputData}
          />
        </div>

        <div className="row my-4">
          <InputComponent nombre="stock" type="number" placeHolder="" value={datosForm.stock} funcion={handleInputData} />

          <InputComponent nombre="precio" type="number" placeHolder="" value={datosForm.precio} funcion={handleInputData} />
        </div>

        {/* Imagenes */}
        <div className="row justify-content-between">
          <div className="col-12">
            <label className="my-4">Seleccione Imagenes</label>
          </div>

          <InputImage id="file1" nombre="ruta1" url={rutas.ruta1} handleChangeUrl={handleImgData} handleValueImage={handleInputImage} />

          <InputImage id="file2" nombre="ruta2" url={rutas.ruta2} handleChangeUrl={handleImgData} handleValueImage={handleInputImage} />

          <InputImage id="file3" nombre="ruta3" url={rutas.ruta3} handleChangeUrl={handleImgData} handleValueImage={handleInputImage} />

          <InputImage id="file4" nombre="ruta4" url={rutas.ruta4} handleChangeUrl={handleImgData} handleValueImage={handleInputImage} />
        </div>

        {/* Select Categorias */}
        <div className="row my-4">
          <div className="col-lg col-12-md">
          <label className="ml-2" style={{textTransform: 'capitalize'}}> Categoria <small className="text-danger" >*</small></label>
          <select name="categoria"
            className="form-control col-lg col-12-md"
            onChange={handleInputData} >
            <option> {datosForm.categoria} </option>
            { category &&
              category.map((x, i) => {
                return <option key={i}>{x.categoria}</option>;
              })}
          </select>
          </div>
        

          <div className="col-lg col-12-md">
            <label className="ml-2">
              Descripcion <small className="text-danger">*</small>
            </label>
            <textarea
              className="form-control"
              name="descripcion"
              rows="4"
              style={{ resize: "none" }}
              value={datosForm.descripcion}
              onChange={handleInputData}
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
