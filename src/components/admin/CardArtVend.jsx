import axios from "axios";
import React from "react";
import QRCode from "react-qr-code";
import { Link, useParams } from "react-router-dom";
import swal from "sweetalert";
import { handlePost, urlServer } from "../../functions/axiosPost";

const CardArtVend = ({id, imgPrincipal, titulo, categoria, marca, precio, estado, codigoQR, tienda}) => {
  const {vendedor} = useParams();
  const codigoProducto = id;
  const tituloToltip = "Advertencia: Si descargas el QR desde este boton y aun no has agregado el codigo, se descargara un codigo que contendra el enlace del producto elegido, si ya has agregado el codigo entonces se agregara el codigo ya guardado anteriormente.";

  /* states */
  const [statusModel, setStatusModel] = React.useState((estado === "1") ? true : false);

  const handleChangeStatusModel = ({target}) => {
    if(target.name === 'terminado'){
      setStatusModel(true);
      handleStatus(1, target.name);
    }else if(target.name === 'pendiente'){
      setStatusModel(false);
      handleStatus(0, target.name)
    }
  }

  const handleStatus = (estado, est) => {
    const f = new FormData();
    f.append('p', 'changeStatusModel');
    f.append('idProducto', codigoProducto);
    f.append('estado', estado);
    const resp = handlePost(f);
    resp.then(res => {
      if(res.data === true){
        swal({
          title: 'Exito',
          text: `El modelo ha sido marcado como ${est}`,
          icon: 'success'
        });
      }else{
        swal({
          title: 'Error',
          text: 'Ha ocurrido un problema vuelva a intentarlo',
          icon: 'error'
        });
      }
    });
  };

  const handleDownloadCode = () => {
    if(codigoQR === null){
      const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = `QRCode_${titulo}_${vendedor}`;
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    }else{
      axios({
        url: `${urlServer}${codigoQR}`,
        method: 'GET',
        responseType: 'blob' 
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `QRCode_${titulo}_${vendedor}.png`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    }
  }
  
  return (
    <div className="row w-75 mx-auto my-2 border rounded col-10">
      <Link to={`/${tienda}/${id}`} 
        className="col-12 col-md-3 img-card"
        style={{
          backgroundImage:
            `url("${urlServer}${imgPrincipal}")`,
        }}
      ></Link>

      <div className="col-12 col-md-3">
        <h4 className="mt-1 mt-md-5">{titulo}</h4>
        <p className="text-mute">Categoria: {categoria}</p>
        <p>Marca: {marca} </p>
        <p>
          Precio:
          <strong> ${precio} </strong>
        </p>
      </div>

      <div className="col-12 col-md-3 d-flex justify-content-center align-items-center flex-wrap">
        <h4 className="col-12 text-center"> Estado del modelo 3D</h4>

        <div className="col-10 d-flex justify-content-center align-items-center flex-wrap">
          <div className="col-12 text-center" >
          <input
              type="checkbox"
              className="form-check-input"
              name="terminado"
              checked={statusModel}
              onChange={handleChangeStatusModel}
            />
            <label className="form-check-label mr-5">Terminado</label>
          </div>

          <div className="col-12 text-center" >
          <input
              type="checkbox"
              className="form-check-input"
              name="pendiente"
              checked={!statusModel}
              onChange={handleChangeStatusModel}
            />
            <label className="form-check-label mr-5">Pendiente</label>
          </div>
            
          </div>


      </div>

      <div className="col-12 col-md-3 d-flex justify-content-center align-items-center my-2 flex-wrap">

      <QRCode 
        id="QRCode"
        title={`danns.com/${vendedor}/${codigoProducto}`}
        level="L"
        value={`danns.com/${vendedor}/${codigoProducto}`}
        bgColor="#ffffff"
        fgColor="#019BE3"
        style={{display: 'none'}}
        />
        
        <button className="btn color-components m-5 col-10 col-md-6" data-toggle="tooltip"
        data-html="true" title={tituloToltip}
        onClick={handleDownloadCode}
        >Descargar-QR</button>
        
        <Link to={`${vendedor}/${codigoProducto}/agregar-qr`} className="btn color-components m-5 col-10 col-md-6">Agregar-QR</Link>
     
      </div>
    </div>
  );
};

export default CardArtVend;
