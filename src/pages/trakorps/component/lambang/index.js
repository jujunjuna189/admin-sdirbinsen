import { Card } from "../../../../components";
import UpdateLambangSatuanModal from "./UpdateLambangSatuanModal";

const LambangTrakorpsDetail = (props) => {
    return (
        <Card className="px-4">
            <div className="flex justify-between items-center pb-3">
                <span className="font-bold text-base">Lambang Satuan</span>
                <UpdateLambangSatuanModal satuan={props.satuan} satuanLambang={props.satuanLambang} onSave={() => props.onSave && props.onSave()} />
            </div>
            <hr />
            <div className="flex gap-3 py-2">
                {(Object.keys(props.satuanLambang ?? {}).length > 0 && props.satuanLambang.picture != null) && <img src={props.satuanLambang.picture} alt={props.satuanLambang.deskripsi} className={`h-36 aspect-square rounded-lg border ${!props.satuanLambang.picture && "bg-slate-400"}`} />}
                <div className="flex flex-col">
                    <span className="font-semibold">Deskripsi</span>
                    <div className="mt-1" style={{ display: 'flex' }} dangerouslySetInnerHTML={{ __html: props.satuanLambang?.deskripsi ?? '-' }} />
                </div>
            </div>
        </Card>
    );
};

export default LambangTrakorpsDetail;
