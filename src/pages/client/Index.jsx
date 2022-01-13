import React, { useEffect } from "react";
import { Contacto } from "../../components/client/Contacto";
import { Inicio } from "../../components/client/Inicio";
import { Productos } from "../../components/client/Productos";

export const Index = () => {
  useEffect(()=>{
    window.scroll(0,0);
  })
  return (
    <>
      <Inicio />
      <main>
          <Productos />
          <Contacto />
      </main>
    </>
  );
};
