import React, { useEffect } from "react";
import { CardProductos } from "../../components/general/CardProductos";
import { CategoryBar } from "../../components/general/CategoryBar";

export const Productos = () => {

    useEffect(() => {
        window.scrollTo(0,0);
    })

  return (
    <div id="productos">
      <h2 className="text-center mt-5 mb-2">Nombre Tienda</h2>
      <hr className="w-75 " />
      <div className="row w-75 m-auto justify-content-between align-middle">
        <div class="form-group">
          <label>Seleccione Tienda</label>
          <select class="form-control">
            <option>Mueble 1</option>
            <option>Mueble 2</option>
            <option>Mueble 3</option>
            <option>Mueble 4</option>
            <option>Mueble 5</option>
          </select>
        </div>
        <CategoryBar />
        <input className="form-control col-2" type="text" placeholder="Buscar" />
      </div>

      <div className="row justify-content-center m-auto">
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
        <CardProductos />
      </div>
      <div className="row justify-content-center">
      </div>
    </div>
  );
};
