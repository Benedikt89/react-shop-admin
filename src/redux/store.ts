import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer'
import adminProductsReducer from "./products/admin-products-reducer";
import authorisationReducer from "./authorisation/authReducer";


const rootReducer = combineReducers({
    reducer: reducer,
    auth: authorisationReducer,
    products: adminProductsReducer,
    form: formReducer
});

//typing all the state
export type AppStateType = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunkMiddleware)));


export default store;