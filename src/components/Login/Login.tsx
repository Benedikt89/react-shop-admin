import React, {Component, useRef} from "react";
import style from '../Main.module.css';
import LoginUserForm from "../../common/Forms/LoginForm";
import {I_loginInfo} from "../../../../Core/users-types";


interface I_LoginPage {
    logIn: (data:I_loginInfo)=> void
}
const LoginPage = ({logIn}:I_LoginPage) => {
    const onUserSubmit = (formData:any) => {
        logIn({phone: formData.phone, password: formData.password})
    };

    return (
        <div className={style.container}>
            <LoginUserForm onSubmit={onUserSubmit}/>
        </div>
    )
};

export default LoginPage;