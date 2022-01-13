import React from "react";
import { useParams } from "react-router-dom";
import { RegAdmin } from "./RegAdmin";
import { RegUser } from "./RegUser";

export const Registro = () => {
  const {usuario} = useParams();

  return (
    <div>
      <div className="row border rounded w-75 h-75 mx-auto mt-5">
        {
          usuario === 'admin' ?
          (<RegAdmin/>)
          :
          (<RegUser/>)
        }
        <div className="img col-6 img-login border d-none d-md-block"></div>
      </div>
    </div>
  );
};
