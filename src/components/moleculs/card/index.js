const Card = (props) => {
    return (
        <div className={`bg-white py-3 rounded-lg border ${props.className}`}>
            {props.children}
        </div>
    );
}

export default Card;