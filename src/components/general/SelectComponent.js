import React from 'react'

const SelectComponent = ({nombre, data, funcion}) => {
    return (
        <div className="col-lg col-12-md" >
            <label className="ml-2" style={{textTransform: 'capitalize'}}> Categoria <small className="text-danger" >*</small></label>
          <select name={nombre}
            className="form-control"
            onChange={funcion}
          >
            <option>Seleccione</option>
            { data &&
              data.map((x, i) => {
                return <option key={i}>{x.categoria}</option>;
              })}
          </select>
        </div>
    )
}

export default SelectComponent
