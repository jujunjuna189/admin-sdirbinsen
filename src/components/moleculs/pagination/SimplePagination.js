const SimplePagination = (props) => {
    return (
        <div className="flex gap-2">
            {props.pages?.map((item, index) => {
                if (index === 0) return <div key={index} className={`px-[0.4rem] py-[0.10rem] border rounded-md border-slate-200 flex justify-center items-center cursor-pointer ${props.currentPage === 1 && 'bg-slate-200'}`} onClick={() => (props.onCallback && props.currentPage > 1) ? props.onCallback(props.currentPage - 1) : {}}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg></div>;
                if (index === (props.pages.length - 1)) return <div key={index} className={`px-[0.4rem] py-[0.10rem] border rounded-md border-slate-200 flex justify-center items-center cursor-pointer ${props.currentPage === (props.pages.length - 2) && 'bg-slate-200'}`} onClick={() => (props.onCallback && props.currentPage < (props.pages.length - 2)) ? props.onCallback(props.currentPage + 1) : {}}><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg></div>;
                return <div key={index} className={`px-[0.7rem] py-[0.10rem] border rounded-md flex justify-center items-center cursor-pointer ${(props.currentPage) === index ? 'border-sendary-600 text-sendary-600' : 'border-slate-200 text-dark'}`} onClick={() => props.onCallback ? props.onCallback(index) : {}}><span className="text-[12px]">{item.label}</span></div>;
            })}
        </div>
    );
}

export default SimplePagination