const InputSelect = (props) => {
    return (
        <div className="leading-3 w-full">
            <div className={`border rounded-md px-3 py-3 w-full focus:outline-none flex justify-between text-slate-600 ${props.className}`}>
                {props.placeholder}
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 9l6 6l6 -6"></path>
                    </svg>
                </div>
            </div>
            {props.error && <small className="text-red-800 pl-1">{props.error}</small>}
        </div>
    );
}

export default InputSelect;