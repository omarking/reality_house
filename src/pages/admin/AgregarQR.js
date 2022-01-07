import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import swal from "sweetalert";
import InputImage from "../../components/general/InputImage";
import { handlePost } from "../../functions/axiosPost";

export const AgregarQR = ({ history }) => {
  const { vendedor, codigoProducto } = useParams();
  const servidor = "http://localhost/Residencia/api/";
  const [producto, setProducto] = useState();
  const [imgCodigo, setImgCodigo] = useState();
  const [ruta, setRuta] = useState(
    "https://images.pexels.com/photos/225769/pexels-photo-225769.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  );

  const handleGetData = () => {
    const f = new FormData();
    f.append("p", "getProductForId");
    f.append("s", vendedor);
    f.append("id", codigoProducto);
    const resp = handlePost(f);
    resp.then((res) => {
      setProducto(res.data[0]);
    });
  };

  const handleInputImage = ({ target }) => {
    setImgCodigo(target.files[0]);
  };

  const handleChangeUrlData = (e) => {
    const objetUrl = URL.createObjectURL(e.target.files[0]);
    setRuta(objetUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (imgCodigo !== undefined) {
      const f = new FormData();
      f.append("p", "changeQR");
      f.append("code", imgCodigo);
      f.append("tienda", vendedor);
      f.append("nombreProducto", producto.nombreProducto);
      f.append("codigoProducto", codigoProducto);
      const resp = handlePost(f);
      resp.then((res) => {
        if (res.data) {
          swal({
            title: "Exito",
            text: "El codigoQR se ha guardado correctamente",
            icon: "success",
            timer: 1000,
          });
          history.replace(`/admin/${vendedor}`);
        }else{
          swal({
            title: "Error",
            text: "Vuelva a intentarlo",
            icon: "error",
            timer: 1000,
          });
        }
      });
    }
  };

  useEffect(() => {
    handleGetData();
  }, []);

  if (producto) {
    return (
      <div>
        <h2 className="w-75 mx-auto mb-4">Agregar Codigo QR</h2>

        <form onSubmit={handleSubmit} className="w-75 m-auto">
          <div className="row my-4">
            <div className="col-lg col-12-md">
              <label className="ml-2"> Nombre: {producto.nombreProducto}</label>
            </div>

            <div className="col-lg col-12-md">
              <label className="ml-2"> Marca: {producto.nombreMarca}</label>
            </div>
          </div>

          <div className="row my-4">
            <div className="col-lg col-12-md">
              <label className="ml-2"> Stock: {producto.stock}</label>
            </div>

            <div className="col-lg col-12-md">
              <label className="ml-2"> Precio: ${producto.precio}</label>
            </div>
          </div>

          {/* Imagenes */}
          <div className="row justify-content-between">
            <div className="col-12">
              <label className="my-4">Imagenes</label>
            </div>

            <label
              className="label_img_select"
              style={{
                backgroundImage: `url(${servidor}/${producto.imgPrincipal})`,
              }}
            ></label>

            <label
              className="label_img_select"
              style={{ backgroundImage: `url(${servidor}/${producto.img1})` }}
            ></label>

            <label
              className="label_img_select"
              style={{ backgroundImage: `url(${servidor}/${producto.img2})` }}
            ></label>

            <label
              className="label_img_select"
              style={{ backgroundImage: `url(${servidor}/${producto.img3})` }}
            ></label>

            <InputImage
              id="ruta"
              nombre="ruta"
              url={ruta}
              handleValueImage={handleInputImage}
              handleChangeUrl={handleChangeUrlData}
            />
          </div>

          {/* Select Categorias */}
          <div className="row my-4">
            <div className="col-lg col-12-md">
              <label className="ml-2"> Categoria: {producto.categoria}</label>
            </div>

            <div className="col-lg col-12-md">
              <label className="ml-2">
                {" "}
                Descripcion: {producto.descripcionProducto}
              </label>
            </div>
          </div>

          {/* Botones */}
          <div className="row justify-content-center my-4">
            <input
              type="submit"
              className="btn color-components mx-4"
              value="Agregar"
            />
            <Link
              to={`/admin/${vendedor}`}
              className="btn color-components mx-4"
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    );
  } else {
    return <div> Cargando</div>;
  }
};
