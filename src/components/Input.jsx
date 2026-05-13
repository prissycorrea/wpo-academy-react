function Input({ inputId, id, type, placeholder, value, onChange, disabled, className = "", ...rest }) {
    return (
        <input 
            id={id || inputId}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className={`input ${className}`.trim()}
            {...rest}
        />
    )
}

export default Input