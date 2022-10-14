import { legacy_createStore as createStore } from 'redux';
import {applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import rootReducer from './redux/reducers';

const inicialState = {};
const middleware = [thunk];

const store = createStore(
    rootReducer,
    inicialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store