const InputChecked = (props) => {
    return (
        <label className="custome-checkbox">
            <input className="cursor-pointer" type="checkbox" checked={props.checked} onChange={(event) => props.onChange && props.onChange(event.target.checked)} />
            <span className="custome-checkmark"></span>
        </label>
    );
}

export default InputChecked;