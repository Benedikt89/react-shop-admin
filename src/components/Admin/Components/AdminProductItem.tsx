import style from "../Admin.module.css";
import React from "react";
import {IProductItem} from "../../../../../Core/products-types";
import EditForm from "../Forms/EditForm";


interface IAdminItemProps {
    product: IProductItem,
    remove: (itemId: string) => void;
    updateProduct: (product: IProductItem)=> void
}

const AdminProductItem = ({product, remove, updateProduct}: IAdminItemProps) => {

    let submitUpdate = (commonData:any) => {
        let newProduct = {
            ...product,
            ...commonData
        };
        updateProduct(newProduct);
    };
    return (
        <div className={style.tableRow}>
            <div className={style.row}>
                <div className={style.mainImg}>
                    <img src={product.photo_thumbnail ? product.photo_thumbnail : product.photo}
                         alt={product.text_short}/>
                </div>
            </div>
            <EditForm title={'Name'} commonValue={product.name} type={"input"}
                      applyChange={(val)=>{submitUpdate({name: val})}}/>

            <EditForm title={'price'} commonValue={product.price} type={"number"}
                      applyChange={(val)=>{submitUpdate({price: val})}}/>

            <EditForm title={'size'} commonValue={product.size} type={"number"}
                      applyChange={(val)=>{submitUpdate({size: val})}}/>

            <EditForm title={'Short Text'} commonValue={product.text_short} type={"input"}
                      applyChange={(val)=>{submitUpdate({text_short: val})}}/>

            <EditForm title={'Long Text'} commonValue={product.text_long} type={"input"}
                      applyChange={(val)=>{submitUpdate({text_long: val})}}/>

            <button
                onClick={() => {
                    remove(product.id)
                }}
                className={style.btnSmallClose}
            >X
            </button>
        </div>

    )
};

export default AdminProductItem