import axios from 'axios';
import { GET_CATEGORIES_SUCCES, GET_CATEGORIES_FAIL } from './types';

export const get_categories = () => async (dispatch) => {
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/categories/`, config);
        if (res.status === 200) {
            dispatch({
                type: GET_CATEGORIES_SUCCES,
                payload: res.data
            });
        } else{
            dispatch({
                type: GET_CATEGORIES_FAIL
            });
        }
    } catch (error) {
        dispatch({
        type: GET_CATEGORIES_FAIL,
        });
    }
}