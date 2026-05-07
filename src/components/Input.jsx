function Input({ inputId, type, placeholder, value, onChange}) {
    return (
        <input 
            id={inputId}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input