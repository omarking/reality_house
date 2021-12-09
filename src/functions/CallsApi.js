import axios from "axios"

export const callGetApi = (params) => {
    return axios.get(`http://localhost/realityhouse/api/productos.php${params}`)
    .then(res =>res)
    .then(data=>{return data});

}