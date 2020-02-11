import {binaryExpression} from "@babel/types";

export interface I_orderItem {
    id: string,
    name: string,
}

export interface I_AppState {
    order: Array<I_orderItem>,
    selectedFilter: string,
    totalPrice: number,
    totalQuantity: number,
    isFetching: boolean,
}
