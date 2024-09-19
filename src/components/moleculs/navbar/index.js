import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logLogo } from "../../../assets";
import { UseAuthContext } from "../../../contexts/auth/AuthContext";
import MenuProfileModal from "../modal/MenuProfileModal";

const Navbar = (props) => {
    const navigation = useNavigate();
    const [element, setElement] = useState();
    const { user } = UseAuthContext();

    const onSetElement = () => {
        setElement(<MenuProfileModal user={user} onMouseOver={() => onSetElement()} onMouseLeave={() => onEmptyElement()} />);
    }

    const onEmptyElement = () => {
        setElement(undefined);
    }

    return (
        <nav className="bg-white py-3 px-7 shadow-md z-10 flex justify-between items-center">
            <div className="text-lg font-semibold cursor-pointer flex items-center gap-2" onClick={() => navigation('/dashboard')}>
                <div className="min-w-8 w-8 max-w-8">
                    <img src={logLogo} alt="LogoPussenarmed" className="w-full" />
                </div>
                <span>Gunner Smart App</span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigation('/profile')} onMouseOver={() => onSetElement()} onMouseLeave={() => onEmptyElement()}>
                <span className="font-semibold">{(user?.auth?.user?.name && user?.auth?.user?.name.split(' ')[0]) ?? 'Anonim'}</span>
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            </div>
            {element}
        </nav>
    );
}

export default Navbar;