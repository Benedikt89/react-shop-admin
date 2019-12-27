import React, {Component} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {NavLink, Redirect, Route} from "react-router-dom";
import {getOrder, getProducts} from "../../redux/selectors";
import {AppStateType} from "../../redux/store";
import style from './Admin.module.css';
import ButtonMain from "../../common/Buttons/ButtonMain";
import AdminProducts from "./pages/AdminProducts";
import {IOrderItem} from "../../types/types";
import LoginPage from "../Login/Login";
import {logIn, logOut} from "../../redux/authorisation/authReducer";
import {fetchCatalog} from "../../redux/reducer";


interface IConnectProps {
    isAuth: boolean,
    userName?: string | null,
    order: Array<IOrderItem>,
}

interface IDispatchProps {
    logIn: (data: any) => void;
    logOut: () => void;
    fetchCatalog: () => void
}

class Admin extends Component<IDispatchProps & IConnectProps> {

    componentDidMount(): void {

    }

    render() {
        let {
            fetchCatalog, isAuth,
            logIn, logOut, userName,
        } = this.props;

        if (isAuth) {
            return (
                <div>
                    <div className={style.tableRow}>
                        <h3>Hello Admin 1{userName ? userName : 'noname'}</h3>
                    </div>
                    <div className={style.cartWrapper}>

                    </div>
                    <div className={style.col}>
                        <NavLink to="/admin/products">
                            <ButtonMain buttonText={"Products"}/>
                        </NavLink>
                        <NavLink to="/admin/order">
                            <ButtonMain buttonText={"Orders"}/>
                        </NavLink>
                        <ButtonMain buttonText={"Fetch Pizzas"} onClickCallback={fetchCatalog} />
                    </div>
                    <div>
                        <div>
                            <Route path="/admin/products" component={AdminProducts}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <LoginPage logIn={logIn}/>
        }
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        userName: state.auth.userName,
        order: getOrder(state),
    }
};

export default compose(
    connect(mapStateToProps, {logIn, logOut, fetchCatalog})
)(Admin);
