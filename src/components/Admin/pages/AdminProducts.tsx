import style from "../Admin.module.css";
import React, {useState} from "react";
import AdminProductItem from "../Components/AdminProductItem";
import {I_productItem} from "../../../../../Core/products-types";
import {compose} from "redux";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/store";
import {getProducts} from "../../../redux/selectors";
import {
    _setProducts,
    createProduct,
    deleteProduct,
    updateProduct
} from "../../../redux/products/admin-products-reducer";
import AddProductReduxForm from "./../../../common/Forms/AddPizzaForm"

interface I_Props {
    products: Array<I_productItem>
}
interface I_DispatchProps {
    _setProducts: (products: Array<I_productItem>)=> void
    deleteProduct: (productId: string)=> void
    updateProduct: (product: I_productItem)=> void
    createProduct: any
}

const AdminProducts = ({products, deleteProduct, updateProduct, createProduct}:I_Props & I_DispatchProps) => {
    let existProducts = products.map((item)=>{
        return <AdminProductItem key={item.id} product={item} remove={deleteProduct} updateProduct={updateProduct} />
    });
    let [newProductExpanded, setNewProductExpanded] = useState(false);

    const onProductSubmit = (formData: any) => {
        createProduct(formData)
    };

    return (
        <div className={style.col}>
            <span onClick={()=>{setNewProductExpanded(true)}}>add new pizza</span>
            {newProductExpanded && <AddProductReduxForm onSubmit={onProductSubmit}/>}
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
    connect(mapStateToProps, {_setProducts, deleteProduct, updateProduct, createProduct})
)(AdminProducts);