import React, {useRef, useState} from "react";
import style from "../Admin.module.css";

interface IEditFormProps {
    title: string
    commonValue: string | number
    type: "input" | "number"
    applyChange: (changedValue: string | number) => void
}

const EditForm = ({commonValue, type, applyChange, title}: IEditFormProps) => {
    let [editable, setEtitable] = useState(false);
    let [changedValue, changeValue] = useState(commonValue);
    let change = (e: any) => {
        changeValue(e.target.value)
    };

    let submit = () => {
        if (!changedValue || changedValue === '') {
            console.log("error")
        } else {
            if(changedValue !== commonValue) {
                applyChange(changedValue);
            }
            setEtitable(false)
        }
    };

    const changeMode = () => {
        setEtitable(true)
    };

    return (
        <div>
            <title>{title}</title>
            {editable ? <input type={type} value={changedValue} autoFocus={true} onChange={change}
                               onBlur={submit} className={style.input}/> :
                <span onDoubleClick={changeMode} className={style.value}>{commonValue}</span>
            }
        </div>
    );
};

export default EditForm