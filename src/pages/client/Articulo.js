import { useParams } from "react-router";
import { useCallGET } from "../../hooks/useCallGET";

export const Articulo = () => {
  const { tienda, codigoProducto } = useParams();
  const url = `http://localhost/realityhouse/api/productos.php?t=${tienda}&p=producto&id=${codigoProducto}`;
  const { data, loading } = useCallGET(url);
  const producto = !!data && data;

  if (loading) {
    return <div>Cargando</div>;
  } else {
    return (
      <div className="row w-100 h-auto justify-content-center mt-4">
        {/* Carousel */}
        <div className="h-auto col-10 col-md-5 mx-2">
          <div
            className="mx-auto mt-4 rounded img-carousel"
            style={{
              backgroundImage:
                'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
            }}
          ></div>
          <div className="h-25 mx-auto mt-2 rounded row justify-content-between col-9">
            <div
              className="border img-select-carousel rounded"
              style={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
              }}
            ></div>
            <div
              className="border img-select-carousel rounded"
              style={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
              }}
            ></div>
            <div
              className="border img-select-carousel rounded"
              style={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
              }}
            ></div>
            <div
              className="border img-select-carousel rounded"
              style={{
                backgroundImage:
                  'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
              }}
            ></div>
          </div>
        </div>

        {/* Info Producto */}
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
        {/* Descripcion Producto */}
        <div className="col-10  mt-5 text-justify">
          <h5>
            <strong>Descripcion:</strong>
          </h5>
          <p>{producto.descripcionProducto}</p>
          <p></p>
        </div>
      </div>
    );
  }
};
