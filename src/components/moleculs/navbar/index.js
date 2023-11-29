import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
            <div className="text-lg font-semibold cursor-pointer" onClick={() => navigation('/dashboard')}>Sdirsen</div>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigation('/profile')} onMouseOver={() => onSetElement()} onMouseLeave={() => onEmptyElement()}>
                <span className="font-semibold">{(user?.auth?.user?.name && user?.auth?.user?.name.split(' ')[0]) ?? 'Anonim'}</span>
                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
            </div>
            {element}
        </nav>
    );
}

export default Navbar;