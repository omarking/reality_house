import React, { useEffect } from "react";
import { handlePost } from "../../functions/axiosPost";

export const CategoryBar = ({ selectCategory }) => {
  const [categoria, setcategoria] = React.useState([]);

  const handleGetData = () => {
    const f = new FormData();
    f.append("p", "query");
    f.append("w", "category");
    const resp = handlePost(f);
    resp.then((res) => {
      setcategoria(res.data);
    });
  };

  useEffect(() => {
    handleGetData();
  }, []);

  return (
    <>
      <ul className="nav justify-content-center border h-50 rounded">
        <li className="nav-item">
          <button
            className="nav-link btn-categorias" onClick={() => {selectCategory('Todos') }}>Todos</button>
        </li>


        {categoria &&
          categoria.map((x) => {
            return (
              <li className="nav-item" key={x.idCategoria}>
                <button
                  className="nav-link btn-categorias"
                  onClick={() => {
                    selectCategory(x.categoria);
                  }}
                >
                  {" "}
                  {x.categoria}
                </button>
              </li>
            );
          })}
      </ul>
    </>
  );
};
