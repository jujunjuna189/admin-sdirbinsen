const InputEmail = (props) => {
    return (
        <input id={props.id} name={props.name} type="email" autoComplete={props.name} required className="border rounded-md px-3 py-2 w-full focus:outline-none" placeholder={props.placeholder} value={props.value} onChange={(event) => { props.onChange && props.onChange(event.target.value) }} />
    );
}

export default InputEmail;