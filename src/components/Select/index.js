import { forwardRef } from 'react';
import './index.css';

const Select = forwardRef(({ placeholder = 'Select', name, required, options, label, selectclassName = '', optionClassName = '', labelClassName = '', className = '', onChange = () => { }, value, error, disabled }, ref) => {

    return <div className={`select-wrapper ${className}`}>
        <label className={labelClassName}>{label}</label>
        <select disabled={disabled} required={required} ref={ref} name={name} onChange={onChange} value={value} className={`select ${selectclassName}`}>
            <option value="">{placeholder}</option>
            {(options || []).map(option => <option key={option.value} value={option.value} className={optionClassName}>
                {option.label}
            </option>)}
        </select>
        <div className={`error ${error ? '' : 'hidden'}`}>{error}</div>
    </div>
})

export default Select;