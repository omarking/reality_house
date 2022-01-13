import { useState } from 'react'

export const useForm = ({initialState ={}}) => {
    const [state, setState] = useState(initialState)

    const handleInputChange = ({target}) =>{
        setState({
            ...state,
            [target.name]: target.value
        })
    }

    const handleInputFile = ({target}) => {
        setState({
            ...state,
            [target.name]: target.files[0]
        })
    }

    return [state, handleInputChange, handleInputFile];
}
