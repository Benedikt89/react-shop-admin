import React, {useRef} from "react";
import style from './FormControl.module.css';
import {Field, reduxForm} from "redux-form";
import {renderField} from "./FormsElements/FormsControls";
import {maxLength15, required} from "./FormsElements/validators";

const LoginUserForm = (props: any) => {
    const {handleSubmit, pristine, reset, submitting, error} = props;
    return (
            <form className={style.formControl} onSubmit={handleSubmit}>
                <Field name="phone"
                       type="text"
                       component={renderField}
                       label="phone"
                       validate={[required, maxLength15]}
                />
                <Field name="password"
                       type="text"
                       component={renderField}
                       label="password"
                       validate={[required, maxLength15]}
                />
                <button type="submit" disabled={pristine || submitting}>Log In</button>
                {error && <div>
                    <span className={style.error}>{error}</span>
                </div>}
            </form>
    )
};
export default reduxForm({form: 'logIn'})(LoginUserForm)