const Button = (props) => {
    return (
        <div className={`font-semibold py-2 px-5 rounded-lg flex items-center gap-2 cursor-pointer ${props.className}`} onClick={() => props.onClick && props.onClick()}>{props.children}</div>
    );
}

export default Button;