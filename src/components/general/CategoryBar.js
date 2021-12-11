import React, { useEffect, useState } from "react";
import { handlePost } from "../../functions/axiosPost";

export const CategoryBar = ({ selectCategory }) => {
  const [categoria, setcategoria] = useState([]);

  const handleGetData = () =>{
    const f = new FormData();
    f.append('p', 'query');
    f.append('w', 'category');
    const resp = handlePost(f);
    resp.then(res => {setcategoria(res.data)})
  }

  useEffect(()=>{
    handleGetData()
  },[])


  return (
    <>
      <ul className="nav justify-content-center border h-50 rounded">
        {!categoria ? (
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
