const RoundedSkeleton = (props) => {
    return (
        <div className="animate-pulse">
            <div className={`h-2 bg-slate-200 rounded-lg p-2 ${props.className}`}></div>
        </div>
    );
}

export default RoundedSkeleton;