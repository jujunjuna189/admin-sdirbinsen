import { useEffect, useRef, useState } from "react";

const InputDate = (props) => {
    const [showPicker, setShowPicker] = useState(false);
    // eslint-disable-next-line
    const [selectedDate, setSelectedDate] = useState(props.value ? new Date(props.value) : new Date());
    const [viewDate, setViewDate] = useState(props.value ? new Date(props.value) : new Date());
    const containerRef = useRef(null);

    const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const startDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    // Handle click outside to close picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setShowPicker(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Update selectedDate if props.value changes
    useEffect(() => {
        if (props.value) {
            const newDate = new Date(props.value);
            if (!isNaN(newDate)) {
                setSelectedDate(newDate);
                setViewDate(newDate);
            }
        }
    }, [props.value]);

    const formatDateLabel = (date) => {
        if (!date || isNaN(date.getTime())) return "";
        const d = date.getDate().toString().padStart(2, "0");
        const m = (date.getMonth() + 1).toString().padStart(2, "0");
        const y = date.getFullYear();
        return `${d}/${m}/${y}`;
    };

    const handleDateSelect = (day) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
        setSelectedDate(newDate);
        setShowPicker(false);

        // Format to YYYY-MM-DD for the API
        const yyyy = newDate.getFullYear();
        const mm = (newDate.getMonth() + 1).toString().padStart(2, "0");
        const dd = newDate.getDate().toString().padStart(2, "0");
        props.onChange && props.onChange(`${yyyy}-${mm}-${dd}`);
    };

    const changeMonth = (offset) => {
        setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1));
    };

    const changeYear = (e) => {
        setViewDate(new Date(parseInt(e.target.value), viewDate.getMonth(), 1));
    };

    const renderCalendar = () => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = startDayOfMonth(year, month);
        const days = [];

        // Empty slots for days before the start of the month
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
        }

        // Days of the month
        for (let day = 1; day <= totalDays; day++) {
            const isSelected = props.value && new Date(props.value).getDate() === day && new Date(props.value).getMonth() === month && new Date(props.value).getFullYear() === year;
            const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

            days.push(
                <div
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    className={`h-8 w-8 flex items-center justify-center cursor-pointer rounded-full text-sm transition-all
            ${isSelected ? "bg-red-800 text-white font-bold" : isToday ? "border border-red-800 text-red-800" : "hover:bg-slate-100 text-slate-700"}`}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    const years = [];
    const currentYear = new Date().getFullYear();
    for (let y = currentYear - 100; y <= currentYear + 20; y++) {
        years.push(y);
    }

    return (
        <div className="leading-3 w-full relative" ref={containerRef}>
            <div className="relative group">
                <input
                    id={props.id}
                    name={props.name}
                    type="text"
                    readOnly
                    autoComplete="off"
                    required={props.required}
                    className={`border rounded-md px-3 py-2 w-full focus:outline-none cursor-pointer bg-white group-hover:border-slate-400 transition-colors ${props.className}`}
                    placeholder={props.placeholder ?? "dd/mm/YYYY"}
                    value={props.value ? formatDateLabel(new Date(props.value)) : ""}
                    onClick={() => !props.readOnly && setShowPicker(!showPicker)}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 group-hover:text-slate-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z"></path>
                        <path d="M16 3v4"></path>
                        <path d="M8 3v4"></path>
                        <path d="M4 11h16"></path>
                        <path d="M11 15h1"></path>
                        <path d="M12 15v3"></path>
                    </svg>
                </div>
            </div>

            {showPicker && (
                <div className="absolute z-[999] mt-1 bg-white border border-slate-200 shadow-xl rounded-lg p-4 w-[280px]">
                    <div className="flex justify-between items-center mb-4">
                        <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M15 6l-6 6l6 6"></path>
                            </svg>
                        </button>
                        <div className="flex flex-col items-center">
                            <span className="font-bold text-slate-800">{months[viewDate.getMonth()]}</span>
                            <select value={viewDate.getFullYear()} onChange={changeYear} className="text-xs text-slate-500 bg-transparent border-none focus:ring-0 cursor-pointer">
                                {[...years].reverse().map((y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button onClick={() => changeMonth(1)} className="p-1 hover:bg-slate-100 rounded-full transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M9 6l6 6l-6 6"></path>
                            </svg>
                        </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center mb-2">
                        {["S", "S", "R", "K", "J", "S", "M"].map((day, idx) => (
                            <div key={idx} className="text-[10px] font-bold text-slate-400 uppercase">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1">{renderCalendar()}</div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between">
                        <button
                            onClick={() => {
                                const today = new Date();
                                handleDateSelect(today.getDate());
                            }}
                            className="text-xs font-medium text-red-800 hover:underline"
                        >
                            Hari Ini
                        </button>
                        <button onClick={() => setShowPicker(false)} className="text-xs font-medium text-slate-400 hover:text-slate-600">
                            Tutup
                        </button>
                    </div>
                </div>
            )}

            {props.error && <small className="text-red-800 pl-1 inline-block mt-1">{props.error}</small>}
        </div>
    );
};

export default InputDate;