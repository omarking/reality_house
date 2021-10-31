import React from 'react'
import { CardProductos } from '../../components/general/CardProductos'
import { CategoryBar } from '../../components/general/CategoryBar'

export const Index = () => {
    return (
        <div>
            <h2 className="text-center mt-3" >Catalogo Muebles</h2>
            <div className="row w-75 m-auto justify-content-between">
                <CategoryBar />
                <input className="form-control col-2" type="text" placeholder="Buscar" />
            </div>
            <div className="row justify-content-center mx-auto mt-3">
                <CardProductos/>
                <CardProductos/>
                <CardProductos/>
                <CardProductos/>
                <CardProductos/>
                <CardProductos/>
                <CardProductos/>
                <CardProductos/>
                <CardProductos/>
            </div>
        </div>
    )
}
