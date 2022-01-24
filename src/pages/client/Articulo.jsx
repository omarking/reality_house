import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Carousel } from "../../components/general/Carousel";
import { NoFound } from "../../components/general/NoFound";
import { handlePost } from "../../functions/axiosPost";

export const Articulo = () => {
  const { tienda, codigoProducto } = useParams();
  const [producto, setProducto] = React.useState({});
  const [images, setImages] = React.useState({});
  const [component, setComponent] = React.useState('');

  useEffect(()=>{
    window.scrollTo(0,0);
    handleProducto(tienda, codigoProducto);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  /* Obtenemos la informacion del producto desde el servidor */
  const handleProducto = (tienda, codigoProducto) =>{
    const f = new FormData();
    f.append('p', 'getProductForId');
    f.append('s', tienda);
    f.append('id', codigoProducto);
    const resp = handlePost(f);
    resp.then((res) => {
      const data = res.data[0];
      if(data === undefined){
        setComponent('error');
      }else{
        setComponent('producto');
        setProducto(data);
        setImages({
          img1: data.imgPrincipal,
          img2: data.img1,
          img3: data.img2,
          img4: data.img3,
          img5: data.imagenQR,
        });
      }
    });
  };

  return(
    <>
    {
      (component === 'error') ?
      (<NoFound message="Producto no encontrado" />)
      :
      (
        <div className="row w-100 h-auto justify-content-center mt-4">

        {
          images &&
          (
            <Carousel
        imagenes={images} />
          )
        }


        <div className="col-10 col-md-5 mx-2">
          <h3 className="mt-4">{producto.nombreProducto}</h3>
          <p>Marca: {producto.nombreMarca}</p>
          <p className="text-muted">Categoria: {producto.categoria}</p>
          <p>Vendedor: {producto.nombreTienda}</p>
          <div className="">
            <h5>
              <i className="uil uil-phone"></i> Telefono:
            </h5>
            <p>{producto.telefonoUsuario}</p>
          </div>
          <div className="">
            <h5>
              <i className="uil uil-envelope-alt"></i> Correo:
            </h5>
            <p>{producto.emailUsuario}</p>
          </div>
        </div>

        <div className="col-10  mt-5 text-justify">
          <h5>
            <strong>Descripcion:</strong>
          </h5>
          <p>{producto.descripcionProducto}</p>
          <p></p>
        </div>
      </div>
      )
    }
    </>
  );

/*   if (!producto) {
    return (<div>Cargando</div>);
  } else {
    return (
      
    );
  }; */
};
