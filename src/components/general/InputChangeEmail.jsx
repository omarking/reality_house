import React from 'react'
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import { handlePost } from '../../functions/axiosPost';
export const InputChangeEmail = () => {
    const history = useHistory();
    const [email, setEmail] = React.useState('');
    const [validate, setValidate] = React.useState(false);

    /* Cambia la informacion del input */
    const handleInput = ({target}) =>{
        setEmail(target.value);
    };

    /* funcion del submit */
    const handleSubmit = () => {
        if(email.length < 5){
            setValidate(true);
            setTimeout(()=>{setValidate(false)}, 2400);
        }else{
            handleSendData();
        }
    }

    /* Manda la peticion al sistema para que recupere la contrasena */
    const handleSendData = () =>{
        const f = new FormData();
        f.append('p', 'recPassword');
        f.append('email', email);
        const resp = handlePost(f);
        resp.then(res => {
            if(res.data === 'exito'){
                swal({
                    title: 'Exito',
                    text: 'Verifique su correo electronico',
                    icon: 'success'
                });
                history.push('/login');
            }else{
                swal({
                    title: 'Error',
                    text: 'Verifique su correo sea correcto',
                    icon: 'error'
                });
            }
        });
    }

    return (
        <>
            <div className="form-group border border-success rounded w-50 h-50 d-flex align-items-start justify-content-center flex-wrap color-components btn disabled">
                <label className='col-7 m-auto' htmlFor="">Ingrese su correo Electronico</label>
                <p className='col-6'>Ingrese el correo electronico con el que esta registrado y recibira un mensaje con las instrucciones para recuperar su contrasena </p>
                {
                    validate && 
                    (<div class="alert alert-danger col-12" role="alert">
                    Verifique que el correo sea correcto
                  </div>)
                }
                <input className='form-control col-7' type="email" value={email} onChange={handleInput} placeHolder="email@email.com" />
                <button className="col-7 btn color-components border" onClick={handleSubmit} >Enviar</button>
            </div>
            
        </>
    )
}
