import React from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { handlePost } from "../../functions/axiosPost";

export const Contacto = () => {
  const [validate, setValidate] = React.useState(false);
  const [dataEmail, setDataEmail] = React.useState({
    nombre: "",
    to: "",
    subject: "",
    message: "",
  });

  /* Esta es la funcion del submit, esta llama Validateform */
  const handleSubmit = (event) => {
    event.preventDefault();
    handleValidateForm();
  };

  /* Esta funcion evalua que los valores que deben llenar los formularios no vengan vacios,
  si no vienen vacios mandara llamar a handleSendEmail el cual manda el mensaje de contacto */
  const handleValidateForm = () => {
    if (
      dataEmail.nombre.length <= 4 ||
      dataEmail.to.length <= 4 ||
      dataEmail.subject.length <= 4 ||
      dataEmail.message.length <= 4
    ) {
      setValidate(true);
      setTimeout(()=>{setValidate(false)}, 1200);
    }else{
      handleSendEmail();
    }
  };

  /* Manda el email con los datos proporcionados por el formulario */
  const handleSendEmail = () => {
    const f = new FormData();
    f.append('p', 'emailContact');
    const claves = Object.keys(dataEmail);
    for( let i=0 ; i < claves.length ; i++ ){
      let clave = claves[i];
      f.append(clave, dataEmail[clave]);
    }
    const resp = handlePost(f);
    resp.then(res => {
      if(res.data === 'exito'){
        swal({
          title: 'Exito',
          text: 'El correo ha sido enviado satisfactoriamente',
          icon: 'success',
          button: 'Ok',
        });
        setDataEmail({
          nombre: "",
          to: "",
          subject: "",
          message: "",
        })
      }else{
        swal({
          title: 'Error',
          text: 'El correo no se pudo enviar, vuelva a intentarlo',
          icon: 'error',
          button: 'Ok',
        });
      }
    });
  };

  /* con esta funcion cambiamos el valor de los datos del formulario */
  const handleForm = ({ target }) => {
    setDataEmail({
      ...dataEmail,
      [target.name]: target.value,
    });
  };

  return (
    <section id="contacto">
      <h2 className="text-center mt-5 mb-2">Contacto</h2>
      <div className="row w-75 m-auto border rounded">
        {/* Estructura form */}
        <form onSubmit={handleSubmit} className="col-12 col-md-6" action="">
          <h3 className="mt-4">Escribenos</h3>

          <div className="form-group">
            <label htmlFor="">Nombre</label>
            <input
              className="form-control col-6"
              type="text"
              placeholder="Alexander"
              value={dataEmail.nombre}
              name="nombre"
              onChange={handleForm}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Email</label>
            <input
              className="form-control col-6"
              type="email"
              placeholder="email@email.com"
              value={dataEmail.to}
              name="to"
              onChange={handleForm}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Asunto</label>
            <input
              className="form-control col-6"
              type="text"
              placeholder="Asunto"
              value={dataEmail.subject}
              name="subject"
              onChange={handleForm}
            />
          </div>

          <div className="form-group">
            <label htmlFor="">Mensaje</label>
            <textarea
              className="form-control col-11"
              rows="3"
              style={{ resize: "none" }}
              value={dataEmail.message}
              name="message"
              onChange={handleForm}
            ></textarea>
          </div>

          {validate && (
            <div className="alert alert-danger col-10" role="alert">
              Verifique que la informacion sea correcta.
            </div>
          )}

          <input
            className="btn color-components col-4 mb-4"
            type="submit"
            value="Enviar"
          />
        </form>

        {/* Estructura informacion contacto */}
        <div className="col-12 col-md-6">
          <h3 className="mt-4">Contactanos</h3>

          <div className="row ">
            <div className="col-10 col-md-5 mx-md-2 my-md-2 m-auto">
              <h5>
                <i className="uil uil-map-marker-alt"></i> Ubicacion
              </h5>
              <p>#######</p>
            </div>

            <div className="col-10 col-md-6 mx-md-2 my-md-2 m-auto">
              <h5>
                <i className="uil uil-phone"></i> Nuestros Telefonos
              </h5>
              <p>#######</p>
            </div>

            <div className="col-10 col-md-5 mx-md-2 my-md-2 m-auto">
              <h5>
                <i className="uil uil-clock-nine"></i>Horarios
              </h5>
              <p>#######</p>
            </div>

            <div className="col-10 col-md-6 mx-md-2 my-md-2 m-auto">
              <h5>
                <i className="uil uil-envelope-alt"></i> Correo Electronico
              </h5>
              <p>#######</p>
            </div>

            <div className="col-10 col-md-6 mx-md-2 my-md-2 m-auto">
              <h5>
                <i className="uil uil-link"></i>Pagina Web
              </h5>
              <p>#######</p>
            </div>

            <div className="col-10 col-md-6 mx-md-2 my-md-2 m-auto">
              <h5>Redes sociales:</h5>
              <div className="row">
                <Link
                  to="www.google.com"
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    fontSize: "2rem",
                    margin: "0 5px",
                  }}
                >
                  <i className="uil uil-facebook"></i>
                </Link>
                <Link
                  to="www.google.com"
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    fontSize: "2rem",
                    margin: "0 5px",
                  }}
                >
                  <i className="uil uil-instagram"></i>
                </Link>
                <Link
                  to="www.google.com"
                  style={{
                    textDecoration: "none",
                    color: "#000",
                    fontSize: "2rem",
                    margin: "0 5px",
                  }}
                >
                  <i className="uil uil-youtube"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
