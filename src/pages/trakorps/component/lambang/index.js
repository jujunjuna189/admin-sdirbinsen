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
            <div className="py-2">
                <div className="flex justify-center">
                    {(Object.keys(props.satuanLambang ?? {}).length > 0 && props.satuanLambang.picture != null) && <img src={props.satuanLambang.picture} alt={props.satuanLambang.deskripsi} className={`h-48 aspect-video rounded-lg border ${!props.satuanLambang.picture && "bg-slate-400"}`} />}
                </div>
                <div className="flex flex-col mt-5">
                    <span className="font-semibold">Deskripsi</span>
                    <div className="mt-1" style={{ display: 'flex', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: props.satuanLambang?.deskripsi ?? '-' }} />
                </div>
            </div>
        </Card>
    );
};

export default LambangTrakorpsDetail;