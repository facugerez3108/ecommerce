import { GET_CATEGORIES_SUCCES, GET_CATEGORIES_FAIL } from "../actions/types";

const initialState = {
    categories: null,
}

export default function Categories(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORIES_SUCCES:
            return {
                ...state,
                categories: payload.categories
            }
        case GET_CATEGORIES_FAIL:
            return {
                ...state,
                categories: null
            }
        default:
            return state;
    }
}