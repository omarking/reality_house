import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { useCallGET } from "../../hooks/useCallGET";
import { useForm } from "../../hooks/useForm";

export const AgregarProducto = () => {
  const { user } = useContext(AuthContext);
  const { data, loading } = useCallGET("http://localhost/realityhouse/api/productos.php?p=categorias");
  const category = !!data && data;
  const [cat, setCat] = useState();

  const [formValues, handleInputChange] = useForm({
    nombre: "",
    stock: "",
    precio: "",
    marca: "",
    descripcion: "",
  });

  const handleCategory = (e) => {
    setCat(e.target.value);
  };

  const { nombre, stock, precio, marca, descripcion } = formValues;

  const handleSubmit = (e) => {};



  return (
    <div>
      <h2 className="w-75 mx-auto mb-4">Agregar Producto</h2>

      <form action="" className="w-75 m-auto">
        <div className="form-group">
          <label className="ml-2">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={handleInputChange}
            placeholder="Silla Caoba"
            className="form-control col-md-2 col-10 ml-2"
          />
        </div>

        <div className="form-group" >
          <div>
          <label>Seleccione Imagenes</label>
          </div>
          <input type="file" />
        </div>

        
        <div className="form-group">
          <label className="ml-2">Stock</label>
          <input
            type="number"
            name="stock"
            value={stock}
            onChange={handleInputChange}
            className="form-control col-md-2 col-10 ml-2"
          />
        </div>
        <div className="form-group">
          <label className="ml-2">Precio</label>
          <input
            type="number"
            name="precio"
            value={precio}
            onChange={handleInputChange}
            className="form-control col-md-2 col-10 ml-2"
          />
        </div>
        <div className="form-group">
          <label className="ml-2">Categoria</label>
          <select
            className="form-control col-md-2 col-10 ml-2"
            onChange={(e) => {
              handleCategory(e);
            }}
          >
            <option>Seleccione</option>
            {!loading &&
              category.map((x, i) => {
                return <option key={i}>{x.categoria}</option>;
              })}
          </select>
        </div>

        <div className="form-group">
          <label className="ml-2">Marca</label>
          <input
            type="text"
            value={marca}
            onChange={handleInputChange}
            name="marca"
            placeholder="SanFra"
            className="form-control col-md-2 col-10 ml-2"
          />
        </div>

        <div className="form-group">
          <label className="ml-2">Descripcion</label>
          <textarea
            className="form-control col-md-4 col-10 ml-2"
            name="descripcion"
            value={descripcion}
            onChange={handleInputChange}
            rows="4"
            style={{ resize: "none" }}
          ></textarea>
        </div>

        <div className="row col-md-4 col-10">
          <button
            className="btn color-components ml-2 mr-3"
            onClick={(e) => {
              handleSubmit(e);
            }}
          >
            Agregar
          </button>
          <button className="btn color-components mx-3">Cancelar</button>
        </div>
      </form>
    </div>
  );
};
