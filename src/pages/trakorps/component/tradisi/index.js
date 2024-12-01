import { Button, Card } from "../../../../components";
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
                        <div key={index} className="flex justify-between gap-2 py-2 border-b">
                            <div className="flex gap-3">
                                <div>
                                    {(Object.keys(item ?? {}).length > 0 && item.video != null) && (
                                        <video width="220" height="140" controls>
                                            <source src={item.video + '?time=' + new Date().getTime()} />
                                        </video>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold">Deskripsi</span>
                                    <div className="mt-1" style={{ display: 'flex', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: item?.deskripsi ?? '-' }} />
                                </div>
                            </div>
                            <div className="flex items-start py-2 px-2">
                                <div className="flex gap-2">
                                    <UpdateTradisiSatuanModal satuan={props.satuan} satuanTradisi={item} onSave={() => props.onSave && props.onSave()} />
                                    <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => props.onDelete && props.onDelete(item.id)}>
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default TradisiTrakorpsDetail;
