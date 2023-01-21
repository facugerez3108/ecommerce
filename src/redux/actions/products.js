import axios from 'axios';
import { GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
    GET_PRODUCTS_BY_ARRIVAL_FAIL,
    GET_PRODUCTS_BY_SOLD_SUCCESS,
    GET_PRODUCTS_BY_SOLD_FAIL,
    GET_PRODUCT_SUCCESS,
    GET_PRODUCT_FAIL,
    SEARCH_PRODUCTS_SUCCESS,
    SEARCH_PRODUCTS_FAIL,
    RELATED_PRODUCTS_SUCCESS,
    RELATED_PRODUCTS_FAIL,
    FILTER_PRODUCTS_SUCCESS,
    FILTER_PRODUCTS_FAIL }
    from './types';

export const get_products = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    }
    try {

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-products`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_PRODUCTS_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_PRODUCTS_FAIL,
        });
    }
}

export const get_products_by_arrival = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };
    
    try {

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-products?sortBy=date_created&order=desc&limit=3`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_BY_ARRIVAL_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_PRODUCTS_BY_ARRIVAL_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_PRODUCTS_BY_ARRIVAL_FAIL,
        });
    }
}

export const get_products_by_sold = () => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    };
    
    try {

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-products?sortBy=sold&order=desc&limit=3`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCTS_BY_SOLD_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_PRODUCTS_BY_SOLD_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_PRODUCTS_BY_SOLD_FAIL,
        });
    }
}

export const get_product = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    }
    try {

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/product/${id}`, config);

        if (res.status === 200) {
            dispatch({
                type: GET_PRODUCT_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: GET_PRODUCT_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: GET_PRODUCT_FAIL,
        });
    }
}

export const get_related_products_succes = (id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
        }
    }
    try {

        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/related/${id}`, config);

        if (res.status === 200) {
            dispatch({
                type: RELATED_PRODUCTS_SUCCESS,
                payload: res.data
            });
        }else{
            dispatch({
                type: RELATED_PRODUCTS_FAIL
            });
        }

    }catch(err){
        dispatch({
            type: RELATED_PRODUCTS_FAIL,
        });
    }
}

export const get_filter_products = (category_id, price_range, sort_by, order) => async dispatch => {
    
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({category_id, price_range, sort_by, order});

    try{

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/by/search`, body, config);
     

        if (res.status === 200 && !res.data.err){
            dispatch({
                type: FILTER_PRODUCTS_SUCCESS,
                payload: res.data
            });
            console.log(res.data)
        }else{
            dispatch({
                type: FILTER_PRODUCTS_FAIL
            });
        }

    }catch(err){

        dispatch({
            type: FILTER_PRODUCTS_FAIL,
        });

    }
}

export const get_search_products = (search, category_id) => async dispatch => {
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({search, category_id});

    try{

        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/search`, body, config);

        if (res.status === 200)  {
            dispatch({
                
                type: SEARCH_PRODUCTS_SUCCESS,
                payload: res.data
            });
            console.log("pene", res)
        }else{
            dispatch({
                type: SEARCH_PRODUCTS_FAIL
            });
        }

    }catch(err){

        dispatch({
            type: SEARCH_PRODUCTS_FAIL,
        });

    }
}