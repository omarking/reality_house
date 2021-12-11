import axios from 'axios';
import { useEffect, useState } from 'react'

export const useAxiosPost = (f) => {
    const [state, setState] = useState({data:null, loading: true, error: null});

    useEffect(()=>{
        axios.post((`http://localhost/Residencia/api/index.php`), f, {headers: { 'Content-Type': 'multipart/form-data' }})
        .then(res=>{
            const data = res.data;
            setState({
                loading: false,
                error: null,
                data
            })
        });
    },[]);


    return state;
}
