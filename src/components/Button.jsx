function Button({ children, onClick, type, disabled}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button