import React from "react";

export const GeneradorQr = () => {
  return (
    <div>
      <h2 className="text-center mt-3">Generador QR</h2>
      <div class="card my-3 mx-auto" style={{ width: "18rem" }}>
        <div class="card-body">
          <p>Aqui se visualizara el codigo QR</p>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>

      <textarea
        className="form-control col-5 mx-auto"
        style={{ height: "100px" }}
        placeholder="Informacion sobre el producto"
      ></textarea>
      <div className="w-75 mx-auto text-center mt-3">
      <button className="btn color-components col-2 mx-auto">Descargar</button>
      </div>
    </div>
  );
};
