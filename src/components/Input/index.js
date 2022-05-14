import { forwardRef } from 'react';
import './index.css';

const Input = forwardRef(({ name = '', type = 'text', id = '', className = '', error = '',
    inputClassName = "", value = "", onChange, label = "", labelClassName = "label",
    handleClick, disabled, multiple, required, readOnly, pattern, placeholder = '' }, ref) => {



    return <div className={`input-wrapper ${className} ${handleClick ? 'pointer' : ''}`}>
        <label>
            <div className={labelClassName}>{label}</div>
            <input
                ref={ref}
                required={required}
                readOnly={readOnly}
                multiple={multiple}
                name={name}
                disabled={disabled}
                type={type} id={id}
                className={`input ${inputClassName}`}
                value={value}
                onChange={onChange}
                onClick={handleClick}
                pattern={pattern}
                placeholder={placeholder}
            />
        </label>
        <div className={`error ${error ? '' : 'hidden'}`}>{error}</div>
    </div>
})

export default Input;