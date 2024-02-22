import { useEffect, useRef, useState } from "react";

const InputSelectDropDown = (props) => {
    const reff = useRef(null);
    const [is_show, setIsShow] = useState(false);

    const handleClickOutside = (event) => {
        if (!reff?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onShow = () => {
        setIsShow(!is_show);
    }

    const onChange = (value) => {
        onShow();
        props.onChange && props.onChange(value);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="leading-3 w-full relative" ref={reff}>
            <div className={`border rounded-md px-3 py-3 w-full focus:outline-none flex justify-between ${!props.value && 'text-slate-400'} cursor-pointer ${props.className}`} onClick={() => onShow()}>
                {props.value ?? props.placeholder}
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M6 9l6 6l6 -6"></path>
                    </svg>
                </div>
            </div>
            <div className={`absolute w-full border rounded-lg bg-white overflow-hidden mt-1 z-40 ${!is_show && 'hidden'}`}>
                {props.data?.map((item, index) => {
                    return (
                        <div key={index} className="p-3 hover:bg-slate-200 cursor-pointer flex justify-start" title={item.title} onClick={() => onChange(item)}>
                            <span className="whitespace-pre">{item.title}</span>
                        </div>
                    );
                })}
            </div>
            {props.error && <small className="text-red-800 pl-1">{props.error}</small>}
        </div>
    );
}

export default InputSelectDropDown;