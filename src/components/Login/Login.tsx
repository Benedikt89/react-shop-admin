import React, {Component, useRef} from "react";
import style from '../Main.module.css';

const LoginUserForm:any = ({onSubmit}:any) => {
    const phoneRef = useRef(null);
    const passwordRef = useRef(null);

    const logIn = () => {
        // @ts-ignore
        let obj = {phone: phoneRef.current.value, password: passwordRef.current.value};
        onSubmit(obj);
    };

    return (
        <div>
            <div className={style.container}>
                <input ref={phoneRef}/>
                <input ref={passwordRef}/>
                <button onClick={logIn}>login</button>
            </div>
        </div>
    )
};

interface I_LoginPage {
    logIn: (data:any)=> void
}
const LoginPage = ({logIn}:I_LoginPage) => {
    const onUserSubmit = (data:any) => {logIn(data)};

    return (
        <div className={style.container}>
            <LoginUserForm onSubmit={onUserSubmit}/>
        </div>
    )
};

export default LoginPage;