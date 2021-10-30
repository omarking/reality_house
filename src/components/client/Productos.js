import React from "react";
import { CardProductos } from "../general/CardProductos";

export const Productos = () => {
  return (
    <section id="productos">
      <h2 className="text-center mt-5 mb-2" >Productos</h2>
      <hr className="w-75 " />
      <div className="row justify-content-center m-auto">
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
        <CardProductos/>
      </div>
    </section>
  );
};
