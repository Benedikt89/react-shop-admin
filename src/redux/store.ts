import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer'
import adminProductsReducer from "./products/admin-products-reducer";
import authorisationReducer from "./authorisation/userReducer";


const rootReducer = combineReducers({
    reducer: reducer,
    auth: authorisationReducer,
    products: adminProductsReducer
});

export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));


export default store;