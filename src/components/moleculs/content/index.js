import Navbar from "../navbar";
import Sidebar from "../sidebar";

const Content = (props) => {
    return (
        <div className="absolute top-0 bottom-0 left-0 right-0 flex flex-col text-sm">
            <Navbar />
            <div className="flex items-stretch grow">
                <Sidebar />
                <div className="grow relative">
                    <div className="absolute top-0 left-0 right-0 bottom-0 px-5 py-7 overflow-auto flex flex-col">
                        {props.children}
                    </div>
                </div>
            </div>
            {props.element && props.element}
        </div>
    );
}

export default Content;