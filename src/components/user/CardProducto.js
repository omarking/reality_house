import React from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { handlePost } from "../../functions/axiosPost";

export const CardProducto = ({ urlImagen, codigoProducto, nombreProducto, precio, categoria, tienda}) => {
  const history = useHistory();
  const handleDelete = () =>{
    swal({
      title: "Confirme",
      text: "Esta seguro de eliminar este producto?",
      icon: "warning",
      buttons: ["Cancelar", "Aceptar"]
      /* timer: '2000' */
    }).then((res)=>{
      if(res){
        handleDeletProduct(codigoProducto);
      }
    })
  }

  const handleDeletProduct = (codigoProducto) => {
    const f = new FormData();
    f.append('p', 'deleteProduct');
    f.append('idProducto', codigoProducto);
    const resp = handlePost(f);
    resp.then(res => {
      if( res.data === false){
        swal({text:"Producto Eliminado", icon: "success", timer: 2000});
        history.replace("/user/mis-productos");
      }else{
        swal({text:"No se ha podido eliminar", icon: "danger", timer: 2000});
      }
    })
  }
  
  return (
    <div
      className="card col-10 col-md-3 mx-auto mx-md-2 mb-4"
      style={{ textDecoration: "none", color: "#000" }}>
      <Link
      to={`/${tienda}/${codigoProducto}`}
        className="img-card"
        style={{
          backgroundImage:
            `url("http://localhost/Residencia/api/${urlImagen}")`}}></Link>
      <div className="card-body">
        <h5 className="card-title">{nombreProducto}</h5>
        <p className="card-text">${precio}</p>
        <p className="text-muted">Categoria: {categoria}</p>
        <div className="row justify-content-around">
            <Link to={`/user/editar/${codigoProducto}`} className="btn btn-warning row-animation"><i className="uil uil-edit-alt"></i> Editar</Link>
            <button className="btn btn-danger row-animation" onClick={handleDelete} ><i className="uil uil-trash-alt"></i> Eliminar</button>
        </div>
      </div>
    </div>
  );
};
