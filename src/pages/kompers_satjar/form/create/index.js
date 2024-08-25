import { Button, Content, InputText } from "../../../../components";
import { UseKompersSatjarCreateContext } from "../../../../contexts/kompers_satjat/KompersSatjarCreateContext";
import TableGenerator from "../../../kompers_satjar_category/component/TableGenerator";

const KompersSatjarCreatePage = () => {
    const { controller, onSetController, onSave } = UseKompersSatjarCreateContext();

    return (
        <Content>
            <div className="flex justify-between">
                <span className="font-bold text-xl text-slate-800">Tambah Rekapitulasi</span>
                <div className="py-[2px]">
                    <Button className="bg-slate-700 text-white" onClick={() => onSave()}>
                        Simpan
                    </Button>
                </div>
            </div>
            <div className="flex flex-col gap-3 mt-3">
                <div className="grow">
                    <span className="font-medium">Judul</span>
                    <InputText className="mt-1" value={controller.title} onChange={(value) => onSetController('title', value)} placeholder="..." />
                </div>
                <div className="flex gap-2 grow">
                    <div className="grow">
                        <span className="font-medium">Kelompok</span>
                        <InputText className="mt-1" value={controller.category} onChange={(value) => onSetController('category', value)} placeholder="..." />
                    </div>
                    <div className="grow">
                        <span className="font-medium">Sub Kelompok</span>
                        <InputText className="mt-1" value={controller.sub_category} onChange={(value) => onSetController('sub_category', value)} placeholder="..." />
                    </div>
                </div>
            </div>
            <TableGenerator controller={controller.form} onChange={(value) => onSetController('form', value)} />
        </Content>
    );
}

export default KompersSatjarCreatePage;