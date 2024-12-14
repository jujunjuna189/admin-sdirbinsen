import { useEffect, useRef, useState } from "react";
import { InputText } from "../../../components";
import PreviewPinModal from "./PreviewPinModal";

const TableGenerator = (props) => {
    const inputRefs = useRef({});
    const [element, setElement] = useState(null);
    const [controller, setController] = useState({
        row: 2,
        col: 40,
    });
    // State to track selected cells
    const [selectedCells, setSelectedCells] = useState([]);
    const [mergedCells, setMergedCells] = useState([]);
    const [cellValues, setCellValues] = useState({});
    const [cellTextAlignments, setCellTextAlignments] = useState({});
    // eslint-disable-next-line no-unused-vars
    const [cellPins, setCellPins] = useState({});

    // Function to handle keyboard navigation
    const handleKeyDown = (event) => {
        if (selectedCells.length === 0) return;

        const lastSelectedCell = selectedCells[selectedCells.length - 1];
        const { row, col } = lastSelectedCell;
        let newRow = row;
        let newCol = col;

        switch (event.key) {
            case 'ArrowRight':
                if (col < controller.col - 1) {
                    newCol = col + 1;
                }
                break;
            case 'ArrowLeft':
                if (col > 0) {
                    newCol = col - 1;
                }
                break;
            case 'ArrowDown':
                if (row < controller.row - 1) {
                    newRow = row + 1;
                }
                break;
            case 'ArrowUp':
                if (row > 0) {
                    newRow = row - 1;
                }
                break;
            default:
                return; // Exit early if it's not an arrow key
        }

        const newSelectedCells = [{ row: newRow, col: newCol }];
        setSelectedCells(newSelectedCells);

        // Focus the input in the newly selected cell
        const inputRefKey = `${newRow}-${newCol}`;
        if (inputRefs.current[inputRefKey]) {
            inputRefs.current[inputRefKey].focus();
        }
    };

    const settingData = () => {
        if (Object.keys(props.controller ?? [])?.length > 0) {
            setController(props.controller.controller ?? {
                row: 2,
                col: 40,
            });
            setMergedCells(props.controller.mergedCells ?? []);
            setCellValues(props.controller.cellValues ?? []);
            setCellTextAlignments(props.controller.cellTextAlignments ?? {});
            setCellPins(props.controller.cellPins ?? {});
        }
    }

    const onChanged = () => {
        props.onChange && props.onChange({
            controller: controller,
            selectedCells: selectedCells,
            mergedCells: mergedCells,
            cellValues: cellValues,
            cellTextAlignments: cellTextAlignments,
            cellPins: cellPins,
        });
    }

    useEffect(() => {
        onChanged();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [controller, mergedCells, cellValues, cellTextAlignments, cellPins]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedCells]);

    useEffect(() => {
        settingData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.controller?.controller]);

    return (
        <>
            {props.tools !== false && renderTools({ controller, setController, selectedCells, mergedCells, cellValues, cellPins, setMergedCells, setSelectedCells, setCellTextAlignments, setCellPins, setElement })}
            {renderCells({ inputRefs, tools: props.tools, controller, selectedCells, mergedCells, cellValues, cellTextAlignments, setSelectedCells, setMergedCells, setCellValues })}
            {element}
        </>
    );
}

const renderTools = ({ controller, setController, selectedCells, mergedCells, cellValues, cellPins, setMergedCells, setSelectedCells, setCellTextAlignments, setCellPins, setElement }) => {
    // Function to handle merging cells
    const handleMerge = () => {
        if (selectedCells.length > 1) {
            const rows = selectedCells.map((cell) => cell.row);
            const cols = selectedCells.map((cell) => cell.col);

            const topRow = Math.min(...rows);
            const bottomRow = Math.max(...rows);
            const leftCol = Math.min(...cols);
            const rightCol = Math.max(...cols);

            const rowSpan = bottomRow - topRow + 1;
            const colSpan = rightCol - leftCol + 1;

            const mergedContent = selectedCells
                .map((cell) => cellValues[`${cell.row}-${cell.col}`] || '')
                .join(' ');

            const newMergedCell = {
                row: topRow,
                col: leftCol,
                rowSpan,
                colSpan,
                content: mergedContent,
            };

            // find merged if exist merge to merged
            var mergedCell = [...mergedCells];
            var mergedCellIndex = mergedCell.findIndex((cell) => cell.row === topRow && cell.col === leftCol);
            mergedCellIndex >= 0 ? mergedCell[mergedCellIndex] = newMergedCell : mergedCell = [...mergedCell, newMergedCell];

            setMergedCells([...mergedCell]);
            setSelectedCells([]);
        }
    };

    // Function to remove merging cells
    const removeMerge = () => {
        if (selectedCells.length > 0) {
            var mergedCell = [...mergedCells];

            selectedCells.forEach((item, index) => {
                var mergedCellIndex = mergedCell.findIndex((cell) => cell.row === item.row && cell.col === item.col);
                mergedCell.splice(mergedCellIndex, 1);
            });

            setMergedCells([...mergedCell]);
            setSelectedCells([]);
        }
    };

    // Text aligment
    const handleTextAlignChange = (alignment) => {
        if (selectedCells.length > 0) {
            selectedCells.forEach((item, index) => {
                setCellTextAlignments((prevAlignments) => ({
                    ...prevAlignments,
                    [`${item.row}-${item.col}`]: alignment,
                }));
            });
        }
    };

    // pin
    const pin = async () => {
        var cellData = { ...cellPins };
        if (selectedCells.length > 0) {
            await selectedCells.forEach((item, index) => {
                var value = cellValues[`${item.row}-${item.col}`] || '';
                value = value !== "" ? value : mergedCells.find((x) => x.row === item.row && x.col === item.col)?.content ?? '';

                console.log(value, 'ok');
                cellData = { ...cellData, [item.col]: { columnName: value } };
                setCellPins((prevPins) => {
                    return {
                        ...prevPins,
                        [item.col]: {
                            columnName: value,
                        },
                    };
                });
            });
        }
        setElement(<PreviewPinModal data={cellData} onClickOutside={() => setElement(null)} onCancel={() => setElement(null)} onRemove={(col, data) => {
            setCellPins((prev) => {
                var datas = { ...prev };
                delete datas[col];
                return datas;
            });
        }} />);
    };

    const unPin = async () => {
        var cellData = { ...cellPins };
        if (selectedCells.length > 0) {
            await selectedCells.forEach((item, index) => {
                delete cellData[item.col];
                setCellPins((prev) => {
                    var datas = { ...prev };
                    delete datas[item.col];
                    return datas;
                });
            });
        }
        setElement(<PreviewPinModal data={cellData} onClickOutside={() => setElement(null)} onCancel={() => setElement(null)} onRemove={(col, data) => {
            setCellPins((prev) => {
                var datas = { ...prev };
                delete datas[col];
                return datas;
            });
        }} />);
    };

    return (
        <div className="flex flex-col my-4">
            <div className="flex gap-2 mt-1 items-center">
                <div>
                    <InputText className="w-[71px] h-[30px]" value={controller?.row} placeholder="Baris" onChange={(value) => setController({ ...controller, row: value })} />
                </div>
                <div>
                    <InputText className="w-[71px] h-[30px]" value={controller?.col} placeholder="Kolom" onChange={(value) => setController({ ...controller, col: value })} />
                </div>
                <div className="ml-5 flex gap-1">
                    <span onClick={() => handleMerge()}>
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.25 3C4.45507 3 3 4.45507 3 6.25V17.75C3 19.5449 4.45507 21 6.25 21H17.75C19.5449 21 21 19.5449 21 17.75V6.25C21 4.45507 19.5449 3 17.75 3H6.25ZM4.5 6.25C4.5 5.2835 5.2835 4.5 6.25 4.5H11V7.5H4.5V6.25ZM12.5 16.5H19.5V17.75C19.5 18.7165 18.7165 19.5 17.75 19.5H12.5V16.5ZM19.5 7.5H12.5V4.5H17.75C18.7165 4.5 19.5 5.2835 19.5 6.25V7.5ZM11 16.5V19.5H6.25C5.2835 19.5 4.5 18.7165 4.5 17.75V16.5H11ZM4.5 9H19.5V15H4.5V9Z" fill="#212121" />
                        </svg>
                    </span>
                    <span onClick={() => removeMerge()}>
                        <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 10H11V14H12.5V10Z" fill="#212121" />
                            <path d="M3 6.25C3 4.45507 4.45507 3 6.25 3H17.75C19.5449 3 21 4.45507 21 6.25V17.75C21 19.5449 19.5449 21 17.75 21H6.25C4.45507 21 3 19.5449 3 17.75V6.25ZM6.25 4.5C5.2835 4.5 4.5 5.2835 4.5 6.25V7.5H11V4.5H6.25ZM19.5 16.5H12.5V19.5H17.75C18.7165 19.5 19.5 18.7165 19.5 17.75V16.5ZM19.5 6.25C19.5 5.2835 18.7165 4.5 17.75 4.5H12.5V7.5H19.5V6.25ZM4.5 16.5V17.75C4.5 18.7165 5.2835 19.5 6.25 19.5H11V16.5H4.5ZM4.5 15H19.5V9H4.5V15Z" fill="#212121" />
                        </svg>
                    </span>
                </div>
                <div className="ml-5 flex gap-1">
                    <span onClick={() => handleTextAlignChange('left')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M4 12l10 0" /><path d="M4 18l14 0" /></svg>
                    </span>
                    <span onClick={() => handleTextAlignChange('center')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M8 12l8 0" /><path d="M6 18l12 0" /></svg>
                    </span>
                    <span onClick={() => handleTextAlignChange('end')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M10 12l10 0" /><path d="M6 18l14 0" /></svg>
                    </span>
                </div>
                <div className="ml-5 flex gap-1">
                    <span onClick={() => pin()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 4.5l-4 4l-4 1.5l-1.5 1.5l7 7l1.5 -1.5l1.5 -4l4 -4" /><path d="M9 15l-4.5 4.5" /><path d="M14.5 4l5.5 5.5" /></svg>
                    </span>
                    <span onClick={() => unPin()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 3l18 18" /><path d="M15 4.5l-3.249 3.249m-2.57 1.433l-2.181 .818l-1.5 1.5l7 7l1.5 -1.5l.82 -2.186m1.43 -2.563l3.25 -3.251" /><path d="M9 15l-4.5 4.5" /><path d="M14.5 4l5.5 5.5" /></svg>
                    </span>
                </div>
            </div>
        </div>
    );
}

const renderCells = ({ inputRefs, tools, controller, selectedCells, mergedCells, cellValues, cellTextAlignments, setSelectedCells, setMergedCells, setCellValues }) => {
    const rows = controller?.row ?? 0;
    const columns = controller?.col ?? 0;

    // Function to handle cell selection
    const handleCellClick = (row, col, event) => {
        if (tools === false) return;
        if (event.ctrlKey) {
            setSelectedCells((prevSelectedCells) => [
                ...prevSelectedCells,
                { row, col },
            ]);
        } else {
            setSelectedCells([{ row, col }]);
        }
    };

    const isSelectedCell = (row, col) => {
        return selectedCells.some(
            (cell) => cell.row === row && cell.col === col
        );
    };

    const handleInputChange = (row, col, value) => {
        setCellValues((prevValues) => ({
            ...prevValues,
            [`${row}-${col}`]: value,
        }));
    };

    const handleInputMergedChange = (row, col, value) => {
        var mergedCell = [...mergedCells];
        var mergedCellIndex = mergedCells.findIndex((cell) => cell.row === row && cell.col === col);
        mergedCell[mergedCellIndex].content = value;
        console.log(mergedCell);

        setMergedCells([...mergedCell]);
    }

    const isMergedCell = (row, col) => {
        return mergedCells.find((cell) => cell.row === row && cell.col === col);
    };

    const isCoveredCell = (row, col) => {
        return mergedCells.some(
            (cell) =>
                row >= cell.row &&
                row < cell.row + cell.rowSpan &&
                col >= cell.col &&
                col < cell.col + cell.colSpan &&
                (row !== cell.row || col !== cell.col)
        );
    };

    return (
        <div className="w-full overflow-x-auto grow">
            <table className="table-auto border-collapse border border-gray-300 w-full">
                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex}>
                            {Array.from({ length: columns }).map((_, colIndex) => {
                                const inputRefKey = `${rowIndex}-${colIndex}`;
                                const mergedCell = isMergedCell(rowIndex, colIndex);
                                if (mergedCell) {
                                    return (
                                        <td
                                            key={`${rowIndex}-${colIndex}`}
                                            rowSpan={mergedCell.rowSpan}
                                            colSpan={mergedCell.colSpan}
                                            onClick={(e) => handleCellClick(rowIndex, colIndex, e)}
                                            className={`border ${isSelectedCell(rowIndex, colIndex)
                                                ? 'border-red-300 border-2'
                                                : 'border-gray-300'
                                                }`}
                                        >
                                            <div>
                                                <div className="px-3 h-0 whitespace-pre">{mergedCell.content}</div>
                                                <InputText ref={(el) => (inputRefs.current[inputRefKey] = el)} readOnly={tools === false ? true : false} className={`h-full w-full text-${cellTextAlignments[`${rowIndex}-${colIndex}`] || 'center'} rounded-none border-0`} value={mergedCell.content} onChange={(value) => handleInputMergedChange(mergedCell.row, mergedCell.col, value)} />
                                            </div>
                                        </td>
                                    );
                                } else if (isCoveredCell(rowIndex, colIndex)) {
                                    // Skip cells that are covered by a merged cell
                                    return null;
                                } else {
                                    return (
                                        <td
                                            key={`${rowIndex}-${colIndex}`}
                                            onClick={(e) => handleCellClick(rowIndex, colIndex, e)}
                                            className={`border ${isSelectedCell(rowIndex, colIndex)
                                                ? 'border-red-300 border-2'
                                                : 'border-gray-300'
                                                }`}
                                        >
                                            <div>
                                                <div className="px-3 h-0 whitespace-pre">{cellValues[`${rowIndex}-${colIndex}`] || ''}</div>
                                                <InputText ref={(el) => (inputRefs.current[inputRefKey] = el)} readOnly={tools === false ? true : false} className={`h-full w-full text-${cellTextAlignments[`${rowIndex}-${colIndex}`] || 'center'} rounded-none border-0`} value={cellValues[`${rowIndex}-${colIndex}`] || ''} onChange={(value) =>
                                                    handleInputChange(rowIndex, colIndex, value)
                                                } />
                                            </div>
                                        </td>
                                    );
                                }
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TableGenerator;