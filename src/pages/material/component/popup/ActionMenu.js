import { useRef, useState, useEffect } from "react";

const ActionMenu = ({ item, onShowDetail, onEdit, onDelete, onViewDocument, canUpdate, canDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [menuStyle, setMenuStyle] = useState({});
    const buttonRef = useRef(null);

    const toggleMenu = () => {
        if (!isOpen) {
            // Opening the menu - calculate position
            if (buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect();
                const windowHeight = window.innerHeight;
                const windowWidth = window.innerWidth;
                const spaceBelow = windowHeight - rect.bottom;
                const spaceAbove = rect.top;
                const menuHeightEstimate = 200; // Approximate max height

                let style = {
                    position: 'fixed',
                    zIndex: 50,
                    minWidth: '160px'
                };

                // Horizontal positioning (align right)
                style.right = `${windowWidth - rect.right}px`;

                // Vertical positioning
                if (spaceBelow < menuHeightEstimate && spaceAbove > spaceBelow) {
                    // Open UP
                    style.bottom = `${windowHeight - rect.top + 4}px`; // +4 for margin
                } else {
                    // Open DOWN
                    style.top = `${rect.bottom + 4}px`; // +4 for margin
                }

                setMenuStyle(style);
            }
        }
        setIsOpen(!isOpen);
    };

    // Close on scroll to prevent detached menu
    useEffect(() => {
        const handleScroll = () => {
             if (isOpen) setIsOpen(false);
        };
        window.addEventListener('scroll', handleScroll, true);
        return () => window.removeEventListener('scroll', handleScroll, true);
    }, [isOpen]);

    const handleAction = (action) => {
        setIsOpen(false);
        action();
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                onClick={toggleMenu}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                    <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"></path>
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop to close menu */}
                    <div
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Dropdown Menu */}
                    <div 
                        className="bg-white border border-slate-200 rounded-lg shadow-lg py-1"
                        style={menuStyle}
                    >
                        {/* Detail */}
                        <button
                            className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                            onClick={() => handleAction(() => onShowDetail(item))}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
                                <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"></path>
                            </svg>
                            Detail
                        </button>

                        {/* Lihat Dokumen */}
                        {item?.document_file && (
                            <button
                                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-blue-700 whitespace-pre"
                                onClick={() => handleAction(() => onViewDocument(item.document_file))}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                    <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                    <path d="M9 9l1 0"></path>
                                    <path d="M9 13l6 0"></path>
                                    <path d="M9 17l6 0"></path>
                                </svg>
                                Lihat Dokumen
                            </button>
                        )}

                        {/* Divider */}
                        {(canUpdate || canDelete) && (
                            <div className="border-t border-slate-200 my-1"></div>
                        )}

                        {/* Ubah */}
                        {canUpdate && (
                            <button
                                className="w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 text-yellow-700"
                                onClick={() => handleAction(() => onEdit(item))}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                                    <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                                    <path d="M16 5l3 3"></path>
                                </svg>
                                Ubah
                            </button>
                        )}

                        {/* Hapus */}
                        {canDelete && (
                            <button
                                className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 flex items-center gap-2 text-red-700"
                                onClick={() => handleAction(() => onDelete(item.id))}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M4 7l16 0"></path>
                                    <path d="M10 11l0 6"></path>
                                    <path d="M14 11l0 6"></path>
                                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                </svg>
                                Hapus
                            </button>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default ActionMenu;
