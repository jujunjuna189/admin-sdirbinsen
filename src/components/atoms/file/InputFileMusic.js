import Button from "../button";

const InputFileMusic = (props) => {

    const handleInputChange = (event) => {
        const file = event.target.files[0];
        props.onChange && props.onChange(file);
    };

    return (
        <div className="flex flex-col">
            <div className="flex justify-start">
                <Button className="border hover:bg-slate-100 relative">
                    <input type="file" accept=".mp3,audio" className="absolute left-0 top-0 right-0 bottom-0 border opacity-0 cursor-pointer w-full" onChange={(event) => handleInputChange(event)} />
                    Unggah Lagu
                </Button>
            </div>
            {props.error && <small className="text-red-800 pl-1">{props.error}</small>}
        </div>
    );
}
export default InputFileMusic;