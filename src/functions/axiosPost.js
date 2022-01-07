import axios from "axios"

export const handlePost= async (f) =>{
    const resp = await axios.post((`http://localhost/Residencia/api/index.php`), f, {headers: { 'Content-Type': 'multipart/form-data' }})
    return resp;
} 