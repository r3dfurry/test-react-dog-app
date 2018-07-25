import { applyMiddleware, createStore } from "redux";
import thunk from 'redux-thunk';
import api from './middleware.api';
import rootReducer from './reducers';

const configureStore = (preloadedState?: any) => createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, api)
)
export default configureStore;