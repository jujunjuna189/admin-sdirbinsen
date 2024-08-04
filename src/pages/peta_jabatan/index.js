import React from "react";
import { Button, Card, Content, EmptyData, TableLoader } from "../../components";
import { UsePetaJabatanContext } from "../../contexts/peta_jabatan/PetaJabatanContext";
import { calculateDifferenceDate } from "../../utils";

const PetaJabatanPage = () => {
    const { navigation, element, petaJabatan } = UsePetaJabatanContext();

    const renderTable = () => {
        return (
            <table className="w-full border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th colSpan={2} className="border-b-[1.5px] border-slate-200 pl-5 pr-3 py-2 text-center w-[1rem] min-w-[1rem] max-w-[1rem] bg-slate-200">
                            No
                        </th>
                        <th className="border-b-[1.5px] border-slate-200 px-2 py-2 text-start">Jabatan</th>
                        <th className="border-b-[1.5px] border-slate-200 px-2 py-2 text-start">Nama</th>
                        <th className="border-b-[1.5px] border-slate-200 px-2 py-2 text-start">Pangkat</th>
                        <th className="border-b-[1.5px] border-slate-200 px-2 py-2 text-start">NRP</th>
                        <th className="border-b-[1.5px] border-slate-200 px-2 py-2 text-start">TMT</th>
                        <th className="border-b-[1.5px] border-slate-200 px-2 py-2 text-start">Tahun</th>
                        <th className="border-b-[1.5px] border-slate-200 px-2 py-2 text-start">Bulan</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.keys(petaJabatan?.data)?.map((item, index) => (
                        <React.Fragment key={index}>
                            <tr key={index}>
                                <td className="border-b-[1.5px] border-slate-200 px-2 py-2"></td>
                                <td className="border-b-[1.5px] border-slate-200 px-2 py-2"></td>
                                <td colSpan={7} className="border-b-[1.5px] border-slate-200 px-2 py-2 font-semibold">{item}</td>
                            </tr>
                            {petaJabatan?.data?.[item]?.map((item, childIndex) => {
                                return (
                                    <tr key={childIndex}>
                                        <td className="border-b-[1.5px] border-slate-200 px-2 py-2 text-center">
                                            {index + (childIndex + 1)}
                                        </td>
                                        <td className="border-b-[1.5px] border-slate-200 px-2 py-2 text-center">
                                            {childIndex + 1}
                                        </td>
                                        <td className="border-b-[1.5px] border-slate-200 px-2 py-2">{item.jabatan}</td>
                                        <td className="border-b-[1.5px] border-slate-200 px-2 py-2">{item.personil.nama}</td>
                                        <td className="border-b-[1.5px] border-slate-200 px-2 py-2">{item.personil.pangkat}</td>
                                        <td className="border-b-[1.5px] border-slate-200 px-2 py-2">{item.personil.nrp}</td>
                                        <td className="border-b-[1.5px] border-slate-200 px-2 py-2">{item.tmt}</td>
                                        <td className="border-b-[1.5px] border-slate-200 px-2 py-2">{calculateDifferenceDate(item.tmt, new Date()).years === 0 ? "Tahun" : `${calculateDifferenceDate(item.tmt, new Date()).years} Tahun`}</td>
                                        <td className="border-b-[1.5px] border-slate-200 px-2 py-2">{calculateDifferenceDate(item.tmt, new Date()).months === 0 ? 'Bulan' : `${calculateDifferenceDate(item.tmt, new Date()).months} Bulan`}</td>
                                    </tr>
                                );
                            })}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        );
    };

    return (
        <Content element={element}>
            <div className="flex flex-wrap justify-between items-center">
                <span className="font-bold text-xl text-slate-800">Peta Jabatan</span>
                <div>
                    <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation('/personil/peta_jabatan/create')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                        Tambah
                    </Button>
                </div>
            </div>
            <div className="mt-4">
                <Card>
                    <div className="mb-3 px-5">
                        <div className="inline-block">
                            <Button className="border-2 border-slate-100">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"></path>
                                </svg>
                                Filter
                            </Button>
                        </div>
                    </div>
                    <div className="overflow-x-auto">{Object.keys(petaJabatan).length === 0 ? <TableLoader /> : petaJabatan.data.length === 0 ? <EmptyData /> : renderTable()}</div>
                    <div className="flex justify-end px-5 py-3">
                        <span className="font-semibold text-sm">Rows per page: 10</span>
                    </div>
                </Card>
            </div>
        </Content>
    );
};
export default PetaJabatanPage;
