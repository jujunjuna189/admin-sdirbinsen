import { useState } from "react";

const InputPassword = (props) => {
    const [isRead, setIsRead] = useState(false);

    return (
        <div className="leading-3 w-full">
            <div className="relative flex justify-end items-center">
                <input id={props.id} name={props.name} type={`${isRead ? 'text' : 'password'}`} autoComplete={props.name} required className="border rounded-md px-3 py-2 w-full focus:outline-none" placeholder={props.placeholder} value={props.value ?? ''} onChange={(event) => { props.onChange && props.onChange(event.target.value) }} />
                <div className="absolute px-2 cursor-pointer" onClick={() => setIsRead(!isRead)}>
                    {isRead && (
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-600" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                        </span>
                    )}
                    {!isRead && (
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-600" width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" /><path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" /><path d="M3 3l18 18" /></svg>
                        </span>
                    )}
                </div>
            </div>
            {props.error && <small className="text-red-800 pl-1 inline-block">{props.error}</small>}
        </div>
    );
}

export default InputPassword;