const EmptyData = () => {
    return (
        <div className=" flex justify-center items-center h-[30vh] text-slate-400 border-t">
            <div>
                <div className="flex justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M13.5 19h-8.5a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v4"></path>
                        <path d="M22 22l-5 -5"></path>
                        <path d="M17 22l5 -5"></path>
                    </svg>
                </div>
                <span>Tidak ada data</span>
            </div>
        </div>
    );
}

export default EmptyData;