function Button({ children, onClick, type = "button", disabled, className = "", ...rest }) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`button ${className}`.trim()}
            {...rest}
        >
            {children}
        </button>
    )
}

export default Button