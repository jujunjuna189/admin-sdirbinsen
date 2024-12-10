import { Content } from "../../../components";
import { UseKompersSatjarDetailContext } from "../../../contexts/kompers_satjat/KompersSatjarDetailContext";
import TableGenerator from "../../kompers_satjar_category/component/TableGenerator";

const KompersSatjarDetailPage = () => {
    const { navigation, kompersSatjar } = UseKompersSatjarDetailContext();

    return (
        <Content>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 6l-6 6l6 6"></path>
                </svg>
                <span className="font-semibold text-base text-slate-800">Detail</span>
            </div>
            <div className="flex flex-col gap-3 mt-3 text-center px-20">
                <span className="text-base font-semibold">{kompersSatjar.title}</span>
            </div>
            <div className="mt-3 grow flex flex-col">
                {console.log(kompersSatjar.form)}
                <TableGenerator tools={false} controller={kompersSatjar.form} />
            </div>
        </Content>
    );
}

export default KompersSatjarDetailPage;