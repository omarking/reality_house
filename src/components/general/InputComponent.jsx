import React from 'react'

const InputComponent = ({nombre, type, value, funcion, placeHolder}) => {

    return (
        <div className="col-lg col-12-md">
        <label className="ml-2" style={{textTransform: "capitalize"}} > { nombre } <small className="text-danger" >*</small></label>
        <input
          type={type}
          value={value || ''}
          onChange={funcion}
          name={nombre}
          placeholder={placeHolder}
          className="form-control"
        />
      </div>
    )
}

export default InputComponent
