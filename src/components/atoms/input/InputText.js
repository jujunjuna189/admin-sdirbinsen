const InputText = (props) => {
    return (
        <div className="leading-3 w-full">
            <input id={props.id} name={props.name} type="text" readOnly={props.readOnly} autoComplete={props.name} required className={`border rounded-md px-3 py-2 w-full focus:outline-none ${props.className}`} placeholder={props.placeholder} value={props.value ?? ''} onChange={(event) => { props.onChange && props.onChange(event.target.value) }} />
            {props.error && <small className="text-red-800 pl-1 inline-block">{props.error}</small>}
        </div>
    );
}

export default InputText;