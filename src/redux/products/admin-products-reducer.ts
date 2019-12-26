import {ThunkDispatch} from "redux-thunk";
import {IFilterItem, IProductItem, IProductToCreate} from "../../../../Core/products-types";
import {adminProductsAPI} from "../../api/admin-products-api";

const SET_PRODUCTS = 'admin/SET_PRODUCTS';
const DELETE_PRODUCT = 'admin/DELETE_PRODUCT';
const CREATE_PRODUCT = 'admin/CREATE_PRODUCT';
const UPDATE_PRODUCT = 'admin/UPDATE_PRODUCT';


interface I_AdminProductsState {
    products: Array<IProductItem>,
    filters: Array<IFilterItem>
}

const initialState: I_AdminProductsState = {
    products: [
        {
            filter: [{name: 'big'}],
            id: "123",
            name: "123",
            photo: "http://93.85.88.35/media/images/%D1%80%D1%8B%D0%B1%D0%BD%D1%8B%D0%B9.jpg",
            photo_thumbnail: "http://93.85.88.35/media/images/%D1%80%D1%8B%D0%B1%D0%BD%D1%8B%D0%B9.jpg",
            price: 22.00,
            size: 2,
            text_long: "ng",
            text_short: "da",
        },
    ],
    filters: []
};

type adminReducerActions = I_deleteProductSuccess | I_createProductSuccess | I_updateProductSuccess | I_setProducts

interface I_deleteProductSuccess {
    type: typeof DELETE_PRODUCT,
    productId: string
}
interface I_createProductSuccess {
    type: typeof CREATE_PRODUCT,
    product: IProductToCreate
}
interface I_updateProductSuccess {
    type: typeof UPDATE_PRODUCT,
    product: IProductItem
}
interface I_setProducts {
    type: typeof SET_PRODUCTS,
    products: Array<IProductItem>
}

const adminProductsReducer = (state: I_AdminProductsState = initialState, action: adminReducerActions) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                ...state,
                products: action.products
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                products: state.products ? state.products.filter( pr => pr.id !== action.productId) : [],
            };
        case CREATE_PRODUCT:
            return {
                ...state
            };
        case UPDATE_PRODUCT:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export const _deleteProductSuccess = (productId: string): I_deleteProductSuccess => {
    return {
        type: DELETE_PRODUCT, productId
    }
};
export const _createProductSuccess = (product: IProductItem): I_createProductSuccess => {
    return {
        type: CREATE_PRODUCT, product
    }
};
export const _updateProductSuccess = (product: IProductItem): I_updateProductSuccess => {
    return {
        type: UPDATE_PRODUCT, product
    }
};
export const _setProducts = (products: Array<IProductItem>): I_setProducts => {
    return {
        type: SET_PRODUCTS, products
    }
};
export const createProduct = (sendData:any) => async (dispatch: ThunkDispatch<{}, {}, adminReducerActions>) => {
    let created = await adminProductsAPI.postProduct(sendData);
    dispatch(_createProductSuccess(created));
};
export const deleteProduct = (productId: string) => async (dispatch: ThunkDispatch<{}, {}, adminReducerActions>) => {
    let deleted = await adminProductsAPI.deleteProduct(productId);
    dispatch(_deleteProductSuccess(productId));
};
export const updateProduct = (product: IProductItem) => async (dispatch: ThunkDispatch<{}, {}, adminReducerActions>) => {
    let result = await adminProductsAPI.putProduct(product);
    dispatch(_updateProductSuccess(result))
};

export default adminProductsReducer;