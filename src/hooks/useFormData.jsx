import { useState } from 'react'

export const useFormData = ({initialState = ''}) => {
    const [state, setState] = useState(initialState)

    const handleFormData = ({target}) =>{
        setState(target.files[0]);
    }

    return [state, handleFormData];
}
