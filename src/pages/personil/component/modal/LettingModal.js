import { useEffect, useRef, useState } from "react";
import { InputSelect } from "../../../../components";

const LettingModal = (props) => {
    const ref = useRef();
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: currentYear - 1945 + 1 }, (_, index) => 1945 + index).reverse();
    const [isShow, setIsShow] = useState(false);

    const toogleModal = () => {
        setIsShow(!isShow);
    }

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onFilter = (item) => {
        props.onFilter && props.onFilter(item);
        setIsShow(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="inline-block" ref={ref}>
            <div className="cursor-pointer" onClick={() => toogleModal()}>
                {props.btn ? props.btn : (
                    <>
                        <span className="font-medium">Letting</span>
                        <InputSelect className="mt-1" error={props.error} placeholder={props.value ?? 'Pilih Letting...'} />
                    </>
                )}
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && 'hidden'}`}>
                <div className="absolute h-full w-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-96 z-10">
                    <div className="leading-3">
                        <span className="text-base font-medium">Pilih Letting</span><br />
                        <small>Klik item jika akan memilih</small>
                    </div>
                    <div className="overflow-y-auto h-[25vh] flex flex-col gap-1 py-2 my-2">
                        {years.map((item, index) => {
                            return (
                                <div key={index} className="py-2 border-y font-black cursor-pointer" onClick={() => onFilter(item)}>
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LettingModal;