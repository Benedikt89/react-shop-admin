import style from "../FormControl.module.css";
import {Field, reduxForm} from "redux-form";
import {renderDateTimePicker} from "../DatePicker";
import React from "react";
import {DropDownSelect, renderField} from "../FormsControls";

const OrderReduxForm = (props:any) => {
    const {handleSubmit, pristine, reset, submitting} = props;
    const times = ['', '10', '11', '12'];

    return (
        <form className={style.formControl} onSubmit={handleSubmit}>

            <Field name="phone"
                   type="text"
                   component={renderField}
                // @ts-ignore
                   label="Номер телефона *"
                   validate={[required, number]}
            />
            <Field name="first_name"
                   type="text"
                   component={renderField}
                   label="Name"
                   validate={[required]}
                   warn={required}
            />
            <Field
                name="delivery_date"
                showTime={false}
                component={renderDateTimePicker}
                validate={[required]}
                warn={required}
                label="Дата Заказа"
            />
            <Field name="delivery_time"
                   type="select"
                   component={DropDownSelect}
                   label="time"
                   times={times}
                   validate={[number]}
                   warn={required}
            />
            <Field name="address"
                   type="text"
                   component={renderField}
                   label="address"
                   validate={[required]}
                   warn={required}
            />
            <div className={style.fieldWrapper}>
                <label>comment</label>
                <Field name="comment"
                       type="text"
                       component="textarea"
                       label="comment"
                       validate={[]}
                />
            </div>
            <div>
                <label>payment</label>
                <div className={style.row}>
                    <label><Field name="payment" component="input" type="radio" value="0"/> cash</label>
                    <label><Field name="payment" component="input" type="radio" value="1"/> card</label>
                    <label><Field name="payment" component="input" type="radio" value="3"/> online</label>
                </div>
            </div>

            {props.error && <div>
                <span className={style.error}>{props.error}</span>
            </div>}
            <div>
                <button type="submit" disabled={pristine || submitting}>Order</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
};

export default reduxForm({form: 'order'})(OrderReduxForm)