import React from 'react'

export const FormPass = () => {
    return (
        /* Contraseña */
        <div>
            <h2>Cambiar Contraseña</h2>
            <form >
                <div className="form-group ml-2">
                    <label >Contraseña Actual:</label>
                    <input type="password" className="form-control col-md-2 col-10" placeholder="Contraseña" />
                </div>
                <div className="form-group ml-2">
                    <label >Nueva Contraseña:</label>
                    <input type="password" className="form-control col-md-2 col-10" placeholder="Contraseña" />
                </div>
                <div className="form-group ml-2">
                    <label >Confirmar:</label>
                    <input type="password" className="form-control col-md-2 col-10" placeholder="Contraseña" />
                </div>
                <button className="col-md-2 col-10 btn color-components ml-2">Guardar</button>
            </form>
        </div>
    )
}
