import React, { useEffect } from 'react'
import { urlServer } from '../../functions/axiosPost';

export const Carousel = ({imagenes}) => {
    
    const [imgPrincipal, setImagenPrincipal] = React.useState('')
    const [img, setImg] = React.useState([])

    const handleChangeImg = ({target}) =>{
        setImagenPrincipal(target.value)
    }
    
    useEffect(()=>{
      setImagenPrincipal(`${imagenes.img1}`);
      setImg([`${imagenes.img1}`, `${imagenes.img2}`, `${imagenes.img3}`, `${imagenes.img4}`, `${imagenes.img5}`]);
    },[imagenes]);

    return (
        <div className="h-auto col-10 col-md-5 mx-2">
        <div
          className="mx-auto mt-4 rounded img-carousel"
          style={{
            backgroundImage:
              `url("${urlServer}${imgPrincipal}")`,
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
                                `url("${urlServer}${x}")`,
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
