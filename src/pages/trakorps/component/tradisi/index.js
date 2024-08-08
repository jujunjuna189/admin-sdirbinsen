import { Card } from "../../../../components";
import CreateTradisiSatuanModal from "./CreateTradisiSatuanModal";
import UpdateTradisiSatuanModal from "./UpdateTradisiSatuanModal";

const TradisiTrakorpsDetail = (props) => {
    return (
        <Card className="px-4">
            <div className="flex justify-between items-center pb-3">
                <span className="font-bold text-base">Tradisi Satuan</span>
                <CreateTradisiSatuanModal satuan={props.satuan} onSave={() => props.onSave && props.onSave()} />
            </div>
            <hr />
            <div>
                {props.satuanTradisi.map((item, index) => {
                    return (
                        <div key={index} className="flex justify-between gap-2 py-2">
                            <div className="flex gap-3">
                                {(Object.keys(item ?? {}).length > 0 && item.video != null) && (
                                    <video width="220" height="140" controls>
                                        <source src={item.video + '?time=' + new Date().getTime()} />
                                    </video>
                                )}
                                <div className="flex flex-col">
                                    <span className="font-semibold">Deskripsi</span>
                                    <div className="mt-1" style={{ display: 'flex' }} dangerouslySetInnerHTML={{ __html: item?.deskripsi ?? '-' }} />
                                </div>
                            </div>
                            <UpdateTradisiSatuanModal satuan={props.satuan} satuanTradisi={item} onSave={() => props.onSave && props.onSave()} />
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default TradisiTrakorpsDetail;
