import React, {useState} from "react";
import QRCode from "react-qr-code";

export const GeneradorQr = () => {
  const [QRText, setQRText] = useState("Hello Word");

  const handleChangeInput = ({target}) => {
    setQRText(target.value);
  }

  const handleDownloadCode = () => {
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
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  }


  return (
    <div>
      <h2 className="text-center mt-3">Generador QR</h2>
      
      <div className="card my-3 mx-auto" style={{ width: "18rem" }}>
        <div className="card-body">
        <QRCode 
        id="QRCode"
        title="Producto"
        level="L"
        value={QRText}
        bgColor="#ffffff"
        fgColor="#536d19"
        />
        </div>
      </div>

      <textarea
        className="form-control col-11 col-md-5 mx-auto"
        style={{ height: "150px" }}
        placeholder="Informacion sobre el producto"
        value={QRText}
        onChange={handleChangeInput}
      ></textarea>
      <div className="w-75 mx-auto text-center mt-3">
      <button onClick={handleDownloadCode} className="btn color-components col-6 col-md-2 mx-auto" >Descargar</button>
      </div>
    </div>
  );
};
