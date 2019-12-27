import style from "../Admin.module.css";
import React, {useState} from "react";
import AdminProductItem from "../Components/AdminProductItem";
import {IProductItem} from "../../../../../Core/products-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {getProducts} from "../../../redux/selectors";
import {_setProducts, deleteProduct, updateProduct} from "../../../redux/products/admin-products-reducer";


interface I_Props {
    products: Array<IProductItem>
}
interface I_DispatchProps {
    _setProducts: (products: Array<IProductItem>)=> void
    deleteProduct: (productId: string)=> void
    updateProduct: (product: IProductItem)=> void
}

const AdminProducts = ({products, deleteProduct, updateProduct}:I_Props & I_DispatchProps) => {
    let existProducts = products.map((item)=>{
        return <AdminProductItem product={item} remove={deleteProduct} updateProduct={updateProduct} />
    });
    let [newProductExpanded, setNewProductExpanded] = useState(false);

    return (
        <div className={style.col}>
            <span onClick={()=>{setNewProductExpanded(true)}}>add new pizza</span>
            {newProductExpanded && <div>asasdd</div>}
            {existProducts}
        </div>
    )
};

const mapStateToProps = (state: AppStateType) => {
    return {
        products: getProducts(state),
    }
};

export default compose(
    connect(mapStateToProps, {_setProducts, deleteProduct, updateProduct})
)(AdminProducts);