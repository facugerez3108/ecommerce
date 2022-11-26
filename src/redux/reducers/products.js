import { GET_PRODUCTS_SUCCES,
    GET_PRODUCTS_FAIL,
    GET_PRODUCTS_BY_ARRIVAL_SUCCES,
    GET_PRODUCTS_BY_ARRIVAL_FAIL,
    GET_PRODUCTS_BY_SOLD_SUCCES,
    GET_PRODUCTS_BY_SOLD_FAIL,
    GET_PRODUCT_SUCCES,
    GET_PRODUCT_FAIL,
    SEARCH_PRODUCTS_SUCCES,
    SEARCH_PRODUCTS_FAIL,
    RELATED_PRODUCTS_SUCCES,
    RELATED_PRODUCTS_FAIL,
    FILTER_PRODUCTS_SUCCES,
    FILTER_PRODUCTS_FAIL }
    from '..actions/types';

const initialState = {
    products: null,
    product: null,
    products_arrival: null,
    products_sold: null,
    related_products: null,
    searched_products: null,
    filtered_products: null,
}

export default function Products(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case GET_PRODUCTS_SUCCES:
            return {
                ...state,
                products: payload.products
            }
        case GET_PRODUCTS_FAIL:
            return {
                ...state,
                products: null
            }
        
    }
}


