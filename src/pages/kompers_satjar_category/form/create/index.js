import { Button, Content, InputText } from "../../../../components";
import { UseKompersSatjarCategoryCreateContext } from "../../../../contexts/kompers_satjat/KompersSatjarCategoryCreateContext";
import TableGenerator from "../../component/TableGenerator";

const KompersSatjarCategoryCreatePage = () => {
    const { element, controller, onSetController, onSave } = UseKompersSatjarCategoryCreateContext();

    return (
        <Content element={element}>
            <div className="flex justify-between">
                <span className="font-bold text-xl text-slate-800">Buat Format Rekapitulasi</span>
                <div>
                    <Button className="bg-slate-700 text-white" onClick={() => onSave()}>
                        Simpan
                    </Button>
                </div>
            </div>
            <div className="flex justify-between mt-3">
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
            <TableGenerator onChange={(value) => onSetController('form', value)} />
        </Content>
    );
}

export default KompersSatjarCategoryCreatePage;