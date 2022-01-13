import React from "react";
import { Link } from "react-router-dom";

export const Contacto = () => {
  return (
    <section id="contacto">
      <h2 className="text-center mt-5 mb-2">Contacto</h2>
      <div className="row w-75 m-auto border rounded">
          {/* Estructura form */}
        <form className="col-12 col-md-6" action="">
          <h3 className="mt-4">Escribenos</h3>
          <div className="form-group">
            <label htmlFor="">Nombre</label>
            <input
              className="form-control col-6"
              type="text"
              placeholder="Alexander"
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              className="form-control col-6"
              type="email"
              placeholder="email@email.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Asunto</label>
            <input
              className="form-control col-6"
              type="text"
              placeholder="Asunto"
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Mensaje</label>
            <textarea
              className="form-control col-11"
              rows="3"
              style={{ resize: "none" }}
            ></textarea>
          </div>

          <input
            className="btn color-components col-4 mb-4"
            type="submit"
            value="Enviar"
          />
        </form>

        {/* Estructura informacion contacto */}
        <div className="col-12 col-md-6">
          <h3 className="mt-4" >Contactanos</h3>

          <div className="row ">
              <div className="col-10 col-md-5 mx-md-2 my-md-2 m-auto">
                  <h5><i className="uil uil-map-marker-alt"></i> Ubicacion</h5>
                  <p>#######</p>
              </div>

              <div className="col-10 col-md-6 mx-md-2 my-md-2 m-auto">
                  <h5><i className="uil uil-phone"></i> Nuestros Telefonos</h5>
                  <p>#######</p>
              </div>

              <div className="col-10 col-md-5 mx-md-2 my-md-2 m-auto">
                  <h5><i className="uil uil-clock-nine"></i>Horarios</h5>
                  <p>#######</p>
              </div>

              <div className="col-10 col-md-6 mx-md-2 my-md-2 m-auto">
                  <h5><i className="uil uil-envelope-alt"></i> Correo Electronico</h5>
                  <p>#######</p>
              </div>

              

              <div className="col-10 col-md-6 mx-md-2 my-md-2 m-auto">
                  <h5><i className="uil uil-link"></i>Pagina Web</h5>
                  <p>#######</p>
              </div>

              <div className="col-10 col-md-6 mx-md-2 my-md-2 m-auto">
                  <h5>Redes sociales:</h5>
                  <div className="row">
                      <Link to="www.google.com" style={{textDecoration:'none', color:'#000', fontSize:'2rem', margin:'0 5px'}} ><i className="uil uil-facebook"></i></Link>
                      <Link to="www.google.com" style={{textDecoration:'none', color:'#000', fontSize:'2rem', margin:'0 5px'}}><i className="uil uil-instagram"></i></Link>
                      <Link to="www.google.com" style={{textDecoration:'none', color:'#000', fontSize:'2rem', margin:'0 5px'}}><i className="uil uil-youtube"></i></Link>
                  </div>
              </div>


          </div>



        </div>
      </div>
    </section>
  );
};
