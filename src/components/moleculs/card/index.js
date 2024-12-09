const Card = (props) => {
    return (
        <div className={`bg-white py-3 rounded-lg border ${props.className}`} onClick={props.onClick}>
            {props.children}
        </div>
    );
}

export default Card;