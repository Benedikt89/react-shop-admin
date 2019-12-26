import style from "../Admin.module.css";
import React from "react";
import {IFilterItem, IProductItem} from "../../../../../Core/products-types";
import {I_OrderItem} from "../../../../../Core/orders-types";


interface IAdminItemProps {
    item: IProductItem | I_OrderItem,
    remove: (itemId: string) => void;
    Component: React.Component
}

const AdminItemWrapper = ({item, remove, Component}: IAdminItemProps) => {
    class DeleteComponent extends React.Component {
        render() {
            return (
                <div className={style.deleteWrapper}>
                    {/*
                    // @ts-ignore*/}
                    <Component {...this.props} />
                    <button
                        onClick={() => {
                            remove(item.id)
                        }}
                        className={style.btnSmallClose}
                    >X
                    </button>
                </div>
            )
        }
    }
    return DeleteComponent;
};

export default AdminItemWrapper