import React from "react";

export const AgregarProducto = () => {
  return (
    <div>
      <h2>Agregar Producto</h2>

      <form action="">
        <div className="form-group">
          <label className="ml-2">Nombre</label>
          <input
            type="text"
            placeholder="Silla Caoba"
            className="form-control col-md-2 col-10 ml-2"
          />
        </div>
        <div className="form-group">
          <label className="ml-2">Stock</label>
          <input type="number" className="form-control col-md-2 col-10 ml-2" />
        </div>
        <div className="form-group">
          <label className="ml-2">Precio</label>
          <input type="number" className="form-control col-md-2 col-10 ml-2" />
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
          <input type="text" placeholder="SanFra" className="form-control col-md-2 col-10 ml-2" />
        </div>

        <div className="form-group">
          <label className="ml-2">Precio</label>
          <input type="number" className="form-control col-md-2 col-10 ml-2" />
        </div>

        

        <div className="form-group">
          <label className="ml-2">Descripcion</label>
          <textarea className="form-control col-md-4 col-10 ml-2" rows="4" style={{resize: 'none'}} ></textarea>
        </div>

        <div className="row col-md-4 col-10">
            <button className="btn color-components ml-2 mr-3" >Agregar</button>
            <button className="btn color-components mx-3">Cancelar</button>
        </div>
      </form>
    </div>
  );
};
