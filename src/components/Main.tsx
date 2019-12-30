import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {connect} from "react-redux";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {fetchCatalog, increaseQuantity, decreaseQuantity} from "../redux/reducer";
import {AppStateType} from "../redux/store";
import '../App.css';
import style from './Main.module.css';
import Admin from "./Admin/Admin";
import {getIsAuth} from "../redux/selectors";
import LoginPage from "./Login/Login";
import {logIn} from "../redux/authorisation/authReducer";
import {I_loginInfo} from "../../../Core/users-types";

interface IProps {
    title?: string
}

interface IConnectProps {
    isFetching: boolean,
    totalQuantity: number,
    totalPrice: number,
    isAuth: boolean,
}

interface LinkDispatchProps {
    fetchCatalog: () => void;
    increaseQuantity: (count: number) => void;
    decreaseQuantity: (count: number) => void;
    logIn: (data: I_loginInfo) => void;
}

type MainProps = IProps & IConnectProps & LinkDispatchProps

class Main extends Component<MainProps> {
    constructor(props: MainProps) {
        super(props);

    }

    componentDidMount() {
        this.props.fetchCatalog();
        //listning for errors
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors());
    }

    catchAllUnhandledErrors = (promiseRejectionEvent?: any): any => {
        console.log('some error occured');
    };

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors())
    }

    render() {
        let {isFetching, totalQuantity, totalPrice, isAuth} = this.props;
        const {logIn, fetchCatalog} = this.props;
        return (
            <div>
                <Header totalQuantity={totalQuantity} totalPrice={totalPrice}/>

                <div className={style.mainWrapper}>
                    {isAuth ? <Admin/> : <LoginPage logIn={logIn}/>}
                </div>
                <Footer/>

            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType): IConnectProps => {
    return {
        isFetching: state.reducer.isFetching,
        isAuth: getIsAuth(state),
        totalQuantity: state.reducer.totalQuantity,
        totalPrice: state.reducer.totalPrice,
    }
};
export default compose(
    withRouter,
    connect(mapStateToProps, {fetchCatalog, increaseQuantity, decreaseQuantity, logIn})
)(Main);