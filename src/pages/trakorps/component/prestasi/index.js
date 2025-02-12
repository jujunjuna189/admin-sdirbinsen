import { Button, Card, SimplePagination } from "../../../../components";
import AddPrestasiSatuanModal from "./AddPrestasiSatuanModal";
import AddPrestasiSatuanV2Modal from "./AddPrestasiSatuanV2Modal";
import UpdatePrestasiSatuanModal from "./UpdatePrestasiSatuanModal";
import UpdatePrestasiSatuanV2Modal from "./UpdatePrestasiSatuanV2Modal";

const PrestasiTrakorpsDetail = (props) => {

  const onNextPage = ({ page }) => {
    props.onNextPage && props.onNextPage(page);
  }

  return (
    <Card className="px-4">
      <div className="flex justify-between items-center pb-3">
        <span className="font-bold text-base">Data Prestasi</span>
        <div className="flex gap-2 items-center">
          <AddPrestasiSatuanModal satuan={props.satuan} onSave={() => props.onSave && props.onSave()} />
          <AddPrestasiSatuanV2Modal satuan={props.satuan} onSave={() => props.onSave && props.onSave()} />
        </div>
      </div>
      <hr />
      <div className="my-3">
        {props.satuanPrestasi?.data?.map((item, index) => {
          if (item.kategori === 'perorangan') {
            return (
              <div key={index} className="flex gap-3 border py-1 px-1 rounded-lg mb-2">
                <div className="flex gap-2">
                  <div>
                    <div className="px-2 py-1 font-semibold mt-1 border rounded-md">
                      {(parseInt(props.satuanPrestasi?.from ?? 0)) + index}
                    </div>
                  </div>
                  {item.gambar && (
                    <div className="h-16 min-h-16 w-20 min-w-20 relative border rounded-lg overflow-hidden">
                      <img src={item.gambar} alt="ImagePrestasi" className="object-cover w-full h-full" />
                    </div>
                  )}
                </div>
                <div className="leading-5 mt-1 grow">
                  <table className="leading-4">
                    <tbody>
                      <tr>
                        <td>
                          <small>Nama</small>
                        </td>
                        <td>
                          <small>: {item.nama}</small>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <small>Pangkat</small>
                        </td>
                        <td>
                          <small>: {item.pangkat}</small>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr className="my-2" />
                  <span className="font-semibold text-[14px]">{item.title}</span>
                  <p className="mt-3" style={{ display: 'flex', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: item.deskripsi }} />
                  <hr className="my-2" />
                  <div className="leading-4">
                    <p>
                      <small>Tahun:</small>
                      <small> {item.tahun ?? '-'}</small>
                    </p>
                    <p>
                      <small>Bidang:</small>
                      <small> {item.bidang ?? '-'}</small>
                    </p>
                    <p>
                      <small>Kategori:</small>
                      <small> {item.kategori ?? '-'}</small>
                    </p>
                  </div>
                </div>
                <div className="flex items-start py-2 px-2">
                  <div className="flex gap-2">
                    <UpdatePrestasiSatuanModal item={item} onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
                    <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => props.onDelete && props.onDelete(item.id)}>
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex gap-3 border py-1 px-1 rounded-lg mb-2">
                {item.gambar && (
                  <div className="h-16 min-h-16 w-20 min-w-20 relative border rounded-lg overflow-hidden">
                    <img src={item.gambar} alt="ImagePrestasi" className="object-cover w-full h-full" />
                  </div>
                )}
                <div className="leading-5 mt-1 grow">
                  <span className="font-semibold text-[14px]">{item.title}</span>
                  <p className="mt-3" style={{ display: 'flex', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: item.deskripsi }} />
                  <hr className="my-2" />
                  <div className="leading-4">
                    <p>
                      <small>Tahun:</small>
                      <small> {item.tahun ?? '-'}</small>
                    </p>
                    <p>
                      <small>Bidang:</small>
                      <small> {item.bidang ?? '-'}</small>
                    </p>
                    <p>
                      <small>Kategori:</small>
                      <small> {item.kategori ?? '-'}</small>
                    </p>
                  </div>
                </div>
                <div className="flex items-start py-2 px-2">
                  <div className="flex gap-2">
                    <UpdatePrestasiSatuanV2Modal item={item} onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
                    <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => props.onDelete && props.onDelete(item.id)}>
                      Hapus
                    </Button>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
      <div className="flex justify-end px-5 py-3">
        {Object.keys(props.satuanPrestasi).length !== 0 && props.satuanPrestasi?.data?.length !== 0 && <SimplePagination pages={props.satuanPrestasi?.links ?? []} currentPage={props.satuanPrestasi?.current_page} onCallback={((page) => onNextPage({ page: page }))} />}
      </div>
    </Card>
  );
};

export default PrestasiTrakorpsDetail;
