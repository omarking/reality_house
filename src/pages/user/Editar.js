import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../auth/AuthContext";

export const Editar = () => {
  const { codigoProducto } = useParams();
  const { user } = useContext(AuthContext);
  const [producto, setProducto] = useState([]);
  const [img1, setImg1] = useState(null)
  const [img2, setImg2] = useState(null)
  const f = new FormData();

  useEffect(() => {
    window.scrollTo(0, 0);
    handleProducto(user.tienda, codigoProducto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleImg1 = (e) => {
    setImg1(e.target.files[0])
  }

  const handleImg2 = (e) => {
    setImg2(e.target.files[0])
  }

  const handleProducto = (tienda, codigoProducto) => {
    axios
      .get(
        `http://localhost/realityhouse/api/productos.php?t=${tienda}&p=producto&id=${codigoProducto}`
      )
      .then((res) => {
        const data = res.data;
        setProducto(data);
      });
  };

  const handleSubmit = (e, nombreTienda) =>{
    e.preventDefault()
    f.append('tienda', user.tienda)
    f.append('img1', img1);
    f.append('img2', img2);
    axios.post("http://localhost/realityhouse/api/productos.php", f,
    {headers: {
      'Content-Type': 'multipart/form-data'
    }}).then(res => {
      console.log(res);
    })
  }

  return (
    <div>
      {producto ? (
        <div>
          <h2 className="w-75 mx-auto mb-4">Editar</h2>

          <form className="w-75 m-auto"  method="post" enctype="multipart/form-data">
            <div className="form-group">
              <label className="ml-2">Nombre</label>
              <input
                type="text"
                className="form-control col-md-2 col-10 ml-2"
                value={producto.nombreProducto}
              />
            </div>
            <div className="form-group">
              <label className="ml-2">Stock</label>
              <input
                type="number"
                className="form-control col-md-2 col-10 ml-2"
                value={producto.stock}
              />
            </div>
            <div className="form-group">
              <label className="ml-2">Precio</label>
              <input
                type="number"
                className="form-control col-md-2 col-10 ml-2"
                value={producto.precio}
              />
            </div>
            <div className="form-group">
              <label className="ml-2">Categoria</label>
              <select
                className="form-control col-md-2 col-10 ml-2"
                id="exampleFormControlSelect1"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </div>

            <div className="form-group">
              <label className="ml-2">Marca</label>
              <input
                type="text"
                className="form-control col-md-2 col-10 ml-2"
                value={producto.nombreMarca}
              />
            </div>

            <div className="input-group mb-3 col-12 justify-content-between">
              <div className="custom-file col-2">
                <input type="file" onChange={(e) => {handleImg1(e)}} accept="image/*" />
               
              </div>

               <div className="custom-file col-2">
                <input type="file" onChange={(e) => {handleImg2(e)}} accept="image/*" />
               
              </div>

            </div>

            <div className="form-group">
              <label className="ml-2">Descripcion</label>
              <textarea
                className="form-control col-md-4 col-10 ml-2"
                rows="4"
                style={{ resize: "none" }}
                value={producto.descripcionProducto}
              />
            </div>

            <div className="row col-md-4 col-10">
              <button onClick={e =>{handleSubmit(e, producto.nombreTienda)}} className="btn color-components ml-2 mr-3">
                Agregar
              </button>
              <button className="btn color-components mx-3">Cancelar</button>
            </div>
          </form>
        </div>
      ) : (
        <div>Espere</div>
      )}
    </div>
  );
};
