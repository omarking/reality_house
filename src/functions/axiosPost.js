import axios from "axios"

export const handlePost= async (f) =>{
    const resp = await axios.post((`http://realityhouse.codewaymx.com/api/index.php`), f, {headers: { 'Content-Type': 'multipart/form-data' }})
    return resp;
}

/* export const handlePost= async (f) =>{
    const resp = await axios.post((`http://localhost/Residencia/api/index.php`), f, {headers: { 'Content-Type': 'multipart/form-data' }})
    return resp;
} */


export const urlServer = 'http://realityhouse.codewaymx.com/api/';
/* export const urlServer = 'http://localhost/Residencia/api/'; */