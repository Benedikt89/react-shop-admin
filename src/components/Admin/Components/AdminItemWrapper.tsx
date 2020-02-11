import style from "../Admin.module.css";
import React from "react";
import {I_filterItem, I_productItem} from "../../../../../Core/products-types";
import {I_OrderItem} from "../../../../../Core/orders-types";


interface IAdminItemProps {
    item: I_productItem | I_OrderItem,
    remove: (itemId: string) => void;
    children: React.Component
}

const AdminItemWrapper = ({item, remove, children}: IAdminItemProps) => {
    class DeleteComponent extends React.Component {
        render() {
            return (
                <div className={style.deleteWrapper}>
                    {children}
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