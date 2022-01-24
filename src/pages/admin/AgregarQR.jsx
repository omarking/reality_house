import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
import InputImage from "../../components/general/InputImage";
import { handlePost, urlServer } from "../../functions/axiosPost";

export const AgregarQR = () => {
  const history = useHistory();

  const { vendedor, codigoProducto } = useParams();
  const [producto, setProducto] = useState();
  const [imgCodigo, setImgCodigo] = useState();
  const [ruta, setRuta] = useState(
    "./img/profile.png"
  );

  /* Obtenemos la informacion del producto */
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

  /* Obtenemos la imagen en un estado */
  const handleInputImage = ({ target }) => {
    setImgCodigo(target.files[0]);
  };

  /* Generamos una url temporal para visualizarla en el componente de agregar */
  const handleChangeUrlData = (e) => {
    const objetUrl = URL.createObjectURL(e.target.files[0]);
    setRuta(objetUrl);
  };

  /* La funcion submit */
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
        if (res.data === true) {
          history.replace(`/admin/${vendedor}`);
          swal({
            title: "Exito",
            text: "El codigoQR se ha guardado correctamente",
            icon: "success",
            timer: 1000,
          });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                backgroundImage: `url(${urlServer}/${producto.imgPrincipal})`,
              }}
            ></label>

            <label
              className="label_img_select"
              style={{ backgroundImage: `url(${urlServer}/${producto.img1})` }}
            ></label>

            <label
              className="label_img_select"
              style={{ backgroundImage: `url(${urlServer}/${producto.img2})` }}
            ></label>

            <label
              className="label_img_select"
              style={{ backgroundImage: `url(${urlServer}/${producto.img3})` }}
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
            <button
              onClick={()=>{history.replace(`/admin/${vendedor}`)}}
              className="btn color-components mx-4"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div> Cargando</div>;
  }
};
