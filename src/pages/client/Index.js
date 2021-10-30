import React from "react";
import { Contacto } from "../../components/client/Contacto";
import { Inicio } from "../../components/client/Inicio";
import { Productos } from "../../components/client/Productos";

export const Index = () => {
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
