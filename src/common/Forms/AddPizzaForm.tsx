import React, {useState} from 'react';
import {Field, reduxForm} from 'redux-form';
import {maxLength15, number, required} from "./FormsElements/validators";

import style from './FormControl.module.css';
import { renderField } from './FormsElements/FormsControls';
import FieldFileInput from "./FormsElements/ImageField";


const AddProductReduxForm = (props: any) => {
    const {handleSubmit, pristine, reset, submitting} = props;
    const filters = [{name: "Big"},{name: "All"}];

    return (
        <form className={style.formControl} onSubmit={handleSubmit}>
            {/*<Field name="filter"*/}
            {/*       type="select"*/}
            {/*       component={DropDownSelect}*/}
            {/*       label="filters"*/}
            {/*       filters={filters}*/}
            {/*       validate={[number]}*/}
            {/*       warn={required}*/}
            {/*/>*/}
            <Field name="photo"
                   type="file"
                   component={FieldFileInput}
                   label="image"
                   validate={[required]}
            />
            <Field name="name"
                   type="text"
                   component={renderField}
                   label="название"
                   validate={[required, maxLength15]}
            />
            <Field name="price"
                   type="number"
                   component={renderField}
                   label="цена"
                   validate={[required, number]}
                   warn={required}
            />
            <Field name="size"
                   type="number"
                   component={renderField}
                   label="size"
                   validate={[required, number]}
                   warn={required}
            />
            <Field name="text_long"
                   type="text"
                   component={renderField}
                   label="text_long"
                   validate={[required]}
                   warn={required}
            />
            <Field name="text_short"
                   type="text"
                   component={renderField}
                   label="text_short"
                   validate={[required]}
                   warn={required}
            />

            <div>
                <button type="submit" >addPizza</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
};

export default reduxForm({form: 'addPizza'})(AddProductReduxForm)
