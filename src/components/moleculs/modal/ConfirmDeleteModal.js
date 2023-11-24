import { Button } from "../../atoms";

const ConfirmDeleteModal = (props) => {

    const onClickOutside = () => {
        props.onClickOutside && props.onClickOutside();
    }

    const onCancel = () => {
        props.onCancel && props.onCancel();
    }

    const onSave = async () => {
        props.onSave && props.onSave();
    }

    return (
        <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center z-10">
            <div className="absolute h-full w-full bg-black opacity-30" onClick={() => onClickOutside()} />
            <div className="p-3 border rounded-lg bg-white w-96 z-10">
                <div className="leading-3">
                    <span className="text-base font-medium">Konfirmasi Hapus Data</span><br />
                    <small>Popup Konfirmasi</small>
                </div>
                <div className="flex flex-col gap-1 py-2 my-2">
                    <div className="flex flex-col leading-3">
                        <span className="text-base font-medium">Apakah yakin akan menghapus data ini?</span>
                        <small className="mt-1">Setelah data ini dihapus, data tidak dapat dikembalikan seperti semula</small>
                    </div>
                    <div className="flex-grow" />
                    <div className="flex justify-end mt-3 gap-3">
                        <Button className="border" onClick={() => onCancel()}>Tidak</Button>
                        <Button className="bg-slate-700 text-white" onClick={() => onSave()}>Ya</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ConfirmDeleteModal;