import React from 'react'
import { CategoryBar } from '../../components/general/CategoryBar'
import { CardProducto } from '../../components/user/CardProducto'

export const Catalogo = () => {
    return (
        <>
         <h2 className="text-center my-3" >Mis Productos</h2> 
         <div className="row w-75 mx-auto my-3 justify-content-between">
             <CategoryBar />

             <input type="text" className="form-control col-2" placeholder="Buscar" />

             <button className="btn color-components col-2" >Agregar Producto</button>

         </div>
         <div className="row justify-content-center m-auto">
             <CardProducto />
             <CardProducto />
             <CardProducto />
             <CardProducto />
             <CardProducto />
             <CardProducto />
             <CardProducto />
             <CardProducto />
         </div>
        </>
    )
}
