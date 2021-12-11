import axios from 'axios';
import { useEffect, useState } from 'react'

export const useAxiosGet = (url) => {
    const [state, setState] = useState({data:null, loading: true, error: null});

    useEffect(()=>{
        axios.get(url)
        .then( res =>{
            const data = res.data;
            setState({
                loading: false,
                error: null,
                data
            });
        })
    },[url]);


    return state;
}
