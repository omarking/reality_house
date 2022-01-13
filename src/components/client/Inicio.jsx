import React from 'react'
import { Link } from 'react-router-dom'

export const Inicio = () => {
    return (
        <header id="inicio" className=" text-center">
            <div className="img-header" style={{
                backgroundImage: `url(./img/mueble_header.jpeg)`
            }} ></div>
            <h2 className="text-center mt-3" >Que es Reality House</h2>
            <p className="w-75 mx-auto mt-3 text-justify" >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quisquam facere nisi repellat voluptatum sit ad est quae magnam vel explicabo. Placeat in at ipsum nobis similique necessitatibus. Vitae aut dolorum fuga voluptas in explicabo nam sit deleniti repudiandae harum tempore quasi, sunt minus reiciendis tempora excepturi, facere aliquam itaque velit.</p>
            <p className="w-75 mx-auto mt-3 text-justify">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veniam ducimus aliquam recusandae earum dolores laudantium ut voluptatum autem pariatur voluptate!
            </p>

            <Link className="btn color-components mt-3 row-animation"
            to={{
                pathname:"/",
                hash:"contacto"
            }}
            >Contactanos <i className="uil uil-navigator"></i></Link>
            
        </header>
    )
}
