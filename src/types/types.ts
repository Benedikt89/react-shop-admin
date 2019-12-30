import {binaryExpression} from "@babel/types";

export interface IOrderItem {
    id: string,
    name: string,
}

export interface IAppState {
    order: Array<IOrderItem>,
    selectedFilter: string,
    totalPrice: number,
    totalQuantity: number,
    isFetching: boolean,
}
