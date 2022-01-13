import React from 'react'

const InputImage = ({id, nombre, handleChangeUrl, handleValueImage, url}) => {

    return (
        <div className="col-4-lg col-6-md">
        <input type="file" className="img_select" id={id}
          name={nombre} accept="image/*"
          onChange={(e) => { handleChangeUrl(e); handleValueImage(e);
          }}
        />
        <label
          className="label_img_select"
          htmlFor={id}
          style={{ backgroundImage: `url(${url})` }}
        >
          Seleccione Imagen
        </label>
      </div>
    )
}

export default InputImage