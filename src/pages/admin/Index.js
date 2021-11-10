import React from "react";
import { CardVendedor } from "../../components/admin/CardVendedor";

export const Index = () => {
  return (
    <div>
      <div className="w-75 mx-auto mt-3 row justify-content-between">
        <input
          type="text"
          name=""
          id=""
          placeholder="Buscar"
          className="col-2"
        />
        <button className="btn color-components">Agregar Usuario</button>
      </div>
      <div className="row justify-content-around mx-auto mt-3" style={{maxWidth: '1440px'}}>
          <CardVendedor />
          <CardVendedor />
          <CardVendedor />
          <CardVendedor />
          <CardVendedor />
          <CardVendedor />
          <CardVendedor />
          <CardVendedor />
          <CardVendedor />
      </div>
    </div>
  );
};
