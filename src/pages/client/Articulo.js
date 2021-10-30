import React from "react";

export const Articulo = () => {
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
          <div className="border img-select-carousel rounded" style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
          }}></div>
          <div className="border img-select-carousel rounded" style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
          }}></div>
          <div className="border img-select-carousel rounded" style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
          }}></div>
          <div className="border img-select-carousel rounded" style={{
            backgroundImage:
              'url("https://images.pexels.com/photos/8112950/pexels-photo-8112950.jpeg?auto=compress&cs=tinysrgb&h=650&w=940")',
          }}></div>
        </div>
      </div>

      {/* Info Producto */}
      <div className="col-10 col-md-5 mx-2">
        <h3 className="mt-4">Nombre Articulo</h3>
        <p>Marca: Marca</p>
        <p className="text-muted">Categoria: Categoria</p>
        <p>Vendedor: Vendedor</p>
        <div className="">
          <h5>
            <i className="uil uil-phone"></i> Telefono:{" "}
          </h5>
          <p>#######</p>
        </div>
        <div className="">
          <h5>
            <i className="uil uil-envelope-alt"></i> Correo:{" "}
          </h5>
          <p>#######</p>
        </div>
      </div>
      {/* Descripcion Producto */}
      <div className="col-10  mt-5 text-justify">
        <h5>
          <strong>Descripcion:</strong>
        </h5>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempora
          corrupti optio corporis commodi iure quisquam voluptas molestias
          minima saepe vel?
        </p>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          dolorem dolore porro a provident facere omnis expedita non quae, esse
          ex cupiditate eveniet at pariatur voluptates fuga, nulla molestias
          aspernatur atque reiciendis? Accusantium nam quidem excepturi quia
          obcaecati eum. Excepturi labore assumenda repudiandae voluptatibus
          suscipit beatae, aperiam eveniet dolores natus.
        </p>
      </div>
    </div>
  );
};
