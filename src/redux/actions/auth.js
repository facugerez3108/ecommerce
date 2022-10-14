import { SIGNUP_SUCCESS,
SIGNUP_FAIL, ACTIVATION_SUCCESS, ACTIVATION_FAIL, SET_AUTH_LOADING, REMOVE_AUTH_LOADING, LOGIN_SUCCES, LOGIN_FAIL,
USER_LOADER_SUCCES, USER_LOADER_FAIL, AUTHENTICATED_SUCCES, AUTHENTICATED_FAIL, REFRESH_SUCCES, REFRESH_FAIL, LOGOUT,
RESET_PASSWORD_SUCCES, RESET_PASSWORD_FAIL, RESET_PASSWORD_CONFIRM_SUCCES, RESET_PASSWORD_CONFIRM_FAIL } from './types';
import axios from 'axios';
import {setAlert} from './alert'


export const check_authenticated = () => async dispatch => {
    if (localStorage.getItem('access')){
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            token: localStorage.getItem('access')
        })


        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config)

            if (res.status === 200) {
                dispatch({
                    type: AUTHENTICATED_SUCCES
                });
            }else{
                dispatch({ 
                    type: AUTHENTICATED_FAIL
                });
            }
        } 
        catch (err) {
            dispatch({ 
                type: AUTHENTICATED_FAIL
            });
        }

    } else {
        dispatch({ 
            type: AUTHENTICATED_FAIL
        });
    }
}


export const signup = (first_name, last_name, email, password, re_password) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ first_name, last_name, email, password, re_password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);

       if(res.status === 201){
           dispatch({
               type: SIGNUP_SUCCESS,
               payload: res.data
           });
           dispatch( 
            setAlert('Te enviamos un correo para activar tu cuenta. Por favor revisa en span', 'green')
        );
       }else{
            dispatch({
                type: SIGNUP_FAIL,
            });
            dispatch( 
                setAlert('Error al activar la cuenta, por favor intente otra vez', 'red'));
       }
       dispatch({
            type: REMOVE_AUTH_LOADING
       })

    } catch(err) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: err.response.data.msg
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch( 
            setAlert('Error al conectar con el servidor, intente mas tarde', 'red'));
    }


}

export const load_user = () => async dispatch => {

    if(localStorage.getItem('access')){
        const config = {
            headers: {
                'Autorization': `JWT ${localStorage.getItem('access')}`, 
                'Accept': 'application/json'
            }
        };

        try {

            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);

            if(res.status === 200) {
                dispatch({
                    type: USER_LOADER_SUCCES,
                    payload: res.data
                });
            } else{
                dispatch({
                    type: USER_LOADER_FAIL,
                });
            }

        }catch (err){
            dispatch({
                type: USER_LOADER_FAIL,
            });
        }
    }else{
        dispatch({
            type: USER_LOADER_FAIL,
        });
    }

}

export const login = (email, password) => async dispatch => { 
    
    dispatch({
        type: SET_AUTH_LOADING,
    });

    const config = { 
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({
        email, password
    })

    try { 

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        if (res.status === 200){
            dispatch({ 
                type: LOGIN_SUCCES,
                payload: res.data
            });
            dispatch(load_user());
            
            dispatch({
                type: REMOVE_AUTH_LOADING,
            });

            dispatch(
                setAlert('Inicio de sesión con éxito', 'green')
            )
        }else{ 
            dispatch({ 
                type: LOGIN_FAIL,
            });

            dispatch({ 
                type: REMOVE_AUTH_LOADING
            });

            dispatch(
                setAlert('Inicio de sesión fallido, intente nuevamente', 'red')
            )
        }

    }catch(err) { 
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.msg
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch( 
            setAlert('Error al conectar con el servidor, intente mas tarde', 'red'));
    }


}

export const activate = (uid, token) => async dispatch => {

    dispatch({
        type: SET_AUTH_LOADING
    })
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({uid, token})

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config) 

        if(res.status === 204){
            dispatch({
                type: ACTIVATION_SUCCESS,
            });
            dispatch( 
                setAlert('Cuenta activada correctamente', 'green'));
        }else{
            dispatch({
                type: ACTIVATION_FAIL
            })
            dispatch( 
                setAlert('Hubo un error al activar la cuenta, vuelva a intentarlo', 'red'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        })

    }
    catch(err){
        dispatch({
            type: ACTIVATION_FAIL
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch( 
            setAlert('Error al conectar con el servidor, intente mas tarde', 'red'));
    }
}

export const refresh = () => async dispatch => {
    if (localStorage.getItem('refresh')) {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const body = JSON.stringify({
            refresh: localStorage.getItem('refresh')
        });

        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/refresh/`, body, config);
            
            if (res.status === 200) {
                dispatch({
                    type: REFRESH_SUCCES,
                    payload: res.data
                });
            } else {
                dispatch({
                    type: REFRESH_FAIL
                });
            }
        }catch(err){
            dispatch({
                type: REFRESH_FAIL
            });
        }
    } else {
        dispatch({
            type: REFRESH_FAIL
        });
    }
}

export const reset_password = (email) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({email});

    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);
        if(res.status === 204){
            dispatch({
                type: RESET_PASSWORD_SUCCES
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch( 
                setAlert('Se envió un correo para restablecer la contraseña', 'green'));
        }else{
            dispatch({
                type: RESET_PASSWORD_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch( 
                setAlert('Hubo un error al restablecer la contraseña, vuelva a intentarlo', 'red'));
        }
        dispatch({
            type: REMOVE_AUTH_LOADING
        })

    }catch(err){
        dispatch({
            type: RESET_PASSWORD_FAIL
        });
        dispatch({
            type: REMOVE_AUTH_LOADING
        });
        dispatch( 
            setAlert('Hubo un error al restablecer la contraseña, vuelva a intentarlo', 'red'));
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    dispatch({
        type: SET_AUTH_LOADING
    });

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({
        uid, 
        token, 
        new_password, 
        re_new_password
    });

    if (new_password !== re_new_password){
        dispatch({
            type: RESET_PASSWORD_CONFIRM_FAIL
        })
        dispatch({
            type: REMOVE_AUTH_LOADING
        })
        dispatch(setAlert('Las contraseñas no coinciden', 'red'))
    }else{
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);

            if(res.status === 204){
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_SUCCES
                })
                dispatch({
                    type: REMOVE_AUTH_LOADING
                })
                dispatch(setAlert('Contraseña restablecida con éxito', 'green'))
            } else {
                dispatch({
                    type: RESET_PASSWORD_CONFIRM_FAIL
                })
                dispatch({
                    type: REMOVE_AUTH_LOADING
                })
                dispatch(setAlert('Hubo un error al restablecer la contraseña, vuelva a intentarlo', 'red'))
            }

        }catch(err){
            dispatch({
                type: RESET_PASSWORD_CONFIRM_FAIL
            });
            dispatch({
                type: REMOVE_AUTH_LOADING
            });
            dispatch( 
                setAlert('Hubo un error al restablecer la contraseña, vuelva a intentarlo', 'red'));
        }
    }

}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(setAlert('Sesión cerrada', 'green'));
}