import React from "react";
import { useCallGET } from "../../hooks/useCallGET";

export const CategoryBar = ({ selectCategory }) => {
  const url = "http://localhost/realityhouse/api/productos.php?p=categorias";
  const { data, loading } = useCallGET(url);
  const categoria = !!data && data;

  return (
    <>
      <ul className="nav justify-content-center border h-50 rounded">
        {loading ? (
          <div className="spinner-border text-secondary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          categoria.map((x) => {
            return (
              <li className="nav-item" key={x.idCategoria}>
                <button
                  className="nav-link btn-categorias"
                  onClick={() => {
                    selectCategory(x.categoria);
                  }}
                >
                  {x.categoria}
                </button>
              </li>
            );
          })
        )}
      </ul>
    </>
  );
};
