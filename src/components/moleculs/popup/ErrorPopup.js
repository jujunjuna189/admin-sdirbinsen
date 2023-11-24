const ErrorPopup = (props) => {
    return (
        <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center z-10">
            <div className="absolute h-full w-full bg-black opacity-30" />
            <div className="bg-slate-800 text-white w-96 flex justify-center gap-3 rounded-lg p-2 items-center z-10">
                {props.title ?? 'Gagal menyimpan data'}
            </div>
        </div>
    );
}

export default ErrorPopup;