import React from 'react'
import { useEffect, useState } from 'react/cjs/react.development';

export const Carousel = ({imagenes}) => {
    const servidor= 'http://localhost/Residencia/api/';
    
    const [imgPrincipal, setImagenPrincipal] = useState(`${imagenes.img1}`)
    const [img, setImg] = useState([`${imagenes.img1}`, `${imagenes.img2}`, `${imagenes.img3}`, `${imagenes.img4}`, `${imagenes.img5}`])

    const handleChangeImg = ({target}) =>{
        setImagenPrincipal(target.value)
    }

    return (
        <div className="h-auto col-10 col-md-5 mx-2">
        <div
          className="mx-auto mt-4 rounded img-carousel"
          style={{
            backgroundImage:
              `url("${servidor}${imgPrincipal}")`,
          }}
        ></div>
        <div className="h-25 mx-auto mt-2 rounded row justify-content-between col-9">
            {
                img.map((x, i) => {
                    if(x !== 'null'){
                        return(
                            <button
                            value={x}
                            onClick={handleChangeImg}
                            className="border img-select-carousel rounded"
                            key={i}
                            style={{
                              backgroundImage:
                                `url("${servidor}${x}")`,
                            }}
                          ></button>
                        )
                    }
                })
            }
        </div>
      </div>
    )
}
