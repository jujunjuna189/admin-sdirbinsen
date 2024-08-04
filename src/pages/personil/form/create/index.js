import { Button, Content, InputDate, InputFile, InputNumber, InputText } from "../../../../components";
import { UsePersonilCreateContext } from "../../../../contexts/personil/PersonilCreateContext";
import { dateFormatterV2, getLocalUser } from "../../../../utils";
import { AgamaModal, GolDarahModal, KorpsModal, PangkatModal, SatuanModal, SumberPAModal } from "../../component";

const PersonilCreatePage = () => {
    const { navigation, element, formContent, controller, errors, onSetController, onSave, onSaveAndAdd } = UsePersonilCreateContext();

    const renderContentForm = () => {
        return formContent === 'form' ? renderForm() : renderImport();
    }

    const renderForm = () => {
        return (
            <div className="border rounded-lg p-3 max-w-[652px]">
                <span className="text-base font-medium">Tambah Personil</span>
                <div className="flex flex-col gap-3 mt-3">
                    <div className="flex gap-5 items-center">
                        <div>
                            <div className="w-32 h-40 bg-slate-100 flex justify-center items-center relative">
                                {controller?.picture?.preview && (<div className="w-full h-full absolute bg-slate-100">
                                    <img src={controller?.picture?.preview} alt="ImageProfile" className="object-cover w-full h-full" />
                                </div>)}
                                <div className="flex flex-col gap-1 text-center text-slate-300">
                                    <div className="flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                                        </svg>
                                    </div>
                                    <span className="font-medium">Photo</span>
                                </div>
                            </div>
                        </div>
                        <div className="grow">
                            <div className="mb-2">
                                <span className="font-medium">Unggah Photo</span><br />
                                <small>Lengkapi data diri dengan mengunggah photo profile</small>
                            </div>
                            <div className="flex">
                                <InputFile error={errors.picture} onChange={(value) => onSetController('picture', value)} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <span className="font-medium">NRP</span>
                        <InputNumber className="mt-1" value={controller.nrp} error={errors.nrp} onChange={(value) => onSetController('nrp', value)} placeholder="..." />
                    </div>
                    <div>
                        <span className="font-medium">Nama Lengkap</span>
                        <InputText className="mt-1" value={controller.nama} error={errors.nama} onChange={(value) => onSetController('nama', value)} placeholder="..." />
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-grow">
                            <span className="font-medium">Tanggal Lahir</span>
                            <InputDate className="mt-1" value={controller.tanggal_lahir} error={errors.tanggal_lahir} onChange={(value) => onSetController('tanggal_lahir', value)} placeholder={dateFormatterV2(new Date())} />
                        </div>
                        <div className="flex-grow">
                            <span className="font-medium">Tempat Lahir</span>
                            <InputText className="mt-1" value={controller.tempat_lahir} error={errors.tempat_lahir} onChange={(value) => onSetController('tempat_lahir', value)} placeholder="..." />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-grow">
                            <AgamaModal value={controller.agama} error={errors.agama} onChange={(value) => onSetController('agama', value)} />
                        </div>
                        <div className="flex-grow">
                            <span className="font-medium">Suku Bangsa</span>
                            <InputText className="mt-1" value={controller.suku_bangsa} error={errors.suku_bangsa} onChange={(value) => onSetController('suku_bangsa', value)} placeholder="..." />
                        </div>
                    </div>
                    <GolDarahModal value={controller.golongan_darah} error={errors.golongan_darah} onChange={(value) => onSetController('golongan_darah', value)} />
                    <hr />
                    {!getLocalUser()?.auth?.user?.satuan_id && <SatuanModal value={controller.satuan?.nama} error={errors.satuan} onChange={(value) => onSetController('satuan', value)} />}
                    <SumberPAModal value={controller.sumber_pa} error={errors.sumber_pa} onChange={(value) => onSetController('sumber_pa', value)} />
                    <div className="flex gap-2">
                        <div className="flex-grow">
                            <span className="font-medium">Jabatan</span>
                            <InputText className="mt-1" value={controller.jabatan} error={errors.jabatan} onChange={(value) => onSetController('jabatan', value)} placeholder="..." />
                        </div>
                        <div className="flex-grow">
                            <PangkatModal value={controller.pangkat} error={errors.pangkat} onChange={(value) => onSetController('pangkat', value.nama)} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-grow">
                            <KorpsModal value={controller.korps} error={errors.korps} onChange={(value) => onSetController('korps', value.nama)} />
                        </div>
                        <div className="flex-grow">
                            <span className="font-medium">Psi</span>
                            <InputText className="mt-1" value={controller.psi} error={errors.psi} onChange={(value) => onSetController('psi', value)} placeholder="..." />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-grow">
                            <span className="font-medium">Tmt</span>
                            <InputDate className="mt-1" value={controller.tmt_1} error={errors.tmt_1} onChange={(value) => onSetController('tmt_1', value)} placeholder={dateFormatterV2(new Date())} />
                        </div>
                        <div className="flex-grow">
                            <span className="font-medium">Tmt Pangkat</span>
                            <InputDate className="mt-1" value={controller.tmt_2} error={errors.tmt_2} onChange={(value) => onSetController('tmt_2', value)} placeholder={dateFormatterV2(new Date())} />
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex-grow">
                            <span className="font-medium">Tmt TNI</span>
                            <InputDate className="mt-1" value={controller.tmt_tni} error={errors.tmt_tni} onChange={(value) => onSetController('tmt_tni', value)} placeholder={dateFormatterV2(new Date())} />
                        </div>
                        <div className="flex-grow">
                            <span className="font-medium">Tmt JAB</span>
                            <InputDate className="mt-1" value={controller.tmt_jab} error={errors.tmt_jab} onChange={(value) => onSetController('tmt_jab', value)} placeholder={dateFormatterV2(new Date())} />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mt-8 mb-3 gap-2">
                    <Button className="border" onClick={() => onSaveAndAdd()}>{`Simpan & Tambah Lagi`}</Button>
                    <Button className="bg-slate-700 text-white" onClick={() => onSave()}>Simpan</Button>
                </div>
            </div>
        );
    }

    const renderImport = () => {
        return (
            <div className="border rounded-lg p-3">
                <div className="border border-dashed rounded-lg h-56 flex justify-center items-center">
                    <div>
                        <div className="flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-300" width="70" height="70" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                <path d="M8 11h8v7h-8z"></path>
                                <path d="M8 15h8"></path>
                                <path d="M11 11v7"></path>
                            </svg>
                        </div>
                        <div className="text-center leading-3 m-2 text-slate-400">
                            <small>Pilih file dengan extention excel, sesuai dengan format yang diberikan</small><br />
                            <small>Klik area ini atau tarik file ke sini...</small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <Content element={element}>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 6l-6 6l6 6"></path>
                </svg>
                <span className="font-semibold text-base text-slate-800">Tambah Personel</span>
            </div>
            <div className="flex justify-center">
                <div className="mt-5 flex flex-col gap-3 w-[40rem] min-w-[40rem]">
                    {/* <div className="flex justify-center gap-3">
                        <div className="border rounded-lg p-3 flex flex-col">
                            <div className="leading-3">
                                <span className="text-base font-medium">Tambah personel dengan formulir</span><br />
                                <small>Tambah personel dalam jumlah sedikit</small>
                            </div>
                            <div className="flex-grow" />
                            <div className="mt-3 flex justify-start">
                                <Button className={`${formContent === 'form' ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`} onClick={() => onTabFormContent('form')}>Tambah Personel</Button>
                            </div>
                        </div>
                        <div className="border rounded-lg p-3 flex flex-col">
                            <div className="leading-3">
                                <span className="text-base font-medium">Import Personel</span><br />
                                <small>Tambah personel dalam jumlah banyak dengan menggunggah data personel dalam format excel</small>
                            </div>
                            <div className="flex-grow" />
                            <div className="mt-3 flex justify-start">
                                <Button className={`${formContent === 'import' ? 'bg-green-700 text-white' : 'bg-red-700 text-white'}`} onClick={() => onTabFormContent('import')}>Import Personel</Button>
                            </div>
                        </div>
                    </div> */}
                    {renderContentForm()}
                </div>
            </div>
        </Content>
    );
}
export default PersonilCreatePage;