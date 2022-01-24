import React from "react";
import { Link, useHistory } from "react-router-dom";
import swal from "sweetalert";
import { handlePost, urlServer } from "../../functions/axiosPost";

export const CardProducto = ({ urlImagen, codigoProducto, nombreProducto, precio, categoria, tienda}) => {
  const history = useHistory();

  /* Llama a handleDeleteProductDe ser confirmada la eliminacion del producto */
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

  /* Manda una solicitud al back para que elime el producto */
  const handleDeletProduct = (codigoProducto) => {
    const f = new FormData();
    f.append('p', 'deleteProduct');
    f.append('idProducto', codigoProducto);
    const resp = handlePost(f);
    resp.then(res => {
      if( res.data === false){
        swal({text:"Producto Eliminado", icon: "success", timer: 2000});
        history.push("/user/mis-productos");
      }else{
        swal({text:"No se ha podido eliminar", icon: "danger", timer: 2000});
      }
    })
  }
  
  return (
    <div
      className="card col-10 col-md-3 mx-auto mx-md-2 mb-4 color-card"
      style={{ textDecoration: "none", color: "#000" }}>
      <Link
      to={`/${tienda}/${codigoProducto}`}
        className="img-card"
        style={{
          backgroundImage:
            `url("${urlServer}${urlImagen}")`}}></Link>
      <div className="card-body">
        <h5 className="card-title">{nombreProducto}</h5>
        <p className="card-text">${precio}</p>
        <p className="text-muted">Categoria: {categoria}</p>
        <div className="row justify-content-around">
            <Link to={`/user/editar/${codigoProducto}`} className="btn btn-editar row-animation"><i className="uil uil-edit-alt"></i> Editar</Link>
            <button className="btn btn-eliminar row-animation" onClick={handleDelete} ><i className="uil uil-trash-alt"></i> Eliminar</button>
        </div>
      </div>
    </div>
  );
};
