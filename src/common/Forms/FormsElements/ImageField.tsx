import React, {Component} from 'react'

interface Iprops {
    input: any,
    label: any,
    required: boolean,
    meta: any
}

export default class FieldFileInput  extends Component <Iprops> {
    constructor(props:any) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    onChange(e:any) {
        const { input: { onChange } } = this.props;
        onChange(e.target.files[0])
    }

    render(){
        const { input: { value } } = this.props;
        const {input, label, required, meta } = this.props;  //whatever props you send to the component from redux-form Field
        return(
            <div>
                <label>{label}</label>
                <div>
                    <input
                        type='file'
                        accept='.jpg, .png, .jpeg'
                        onChange={this.onChange}
                    />
                </div>
            </div>
        )
    }
}