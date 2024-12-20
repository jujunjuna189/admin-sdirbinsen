import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReferensiRequest } from "../../api/ReferensiRequest";

const ReferensiContext = createContext();

export const ReferensiContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [filter, setFilter] = useState({ path: '/' });
    const [referensi, setReferensi] = useState({});

    const getReferensi = async () => {
        await getReferensiRequest({ filter: `path=${filter.path}` }).then((res) => {
            console.log(res);
            setReferensi(res);
        });
    }

    const onSetFilter = ({ value = {} }) => {
        setFilter({ ...filter, ...value });
    }

    const onPrev = () => {
        var path = filter.path.split('/');

        if (filter.path !== '/') {
            // Lakukan sesuatu jika path bukan '/'
            console.log("Navigating to the previous path:", path);
            // Contoh: hapus bagian terakhir dari path
            path.pop();
            filter.path = path.join('/') || '/'; // Gabungkan kembali path atau setel ke '/'
            setFilter({ ...filter });
        } else {
            // Lakukan sesuatu jika path adalah '/'
            console.log("Already at the root path, cannot go back further.");
        }
    }

    const onNext = ({ value = '' }) => {
        if (value !== '') {
            // Logika untuk onNext tergantung pada kebutuhan Anda
            console.log("Navigating to the next path...");
            // Contoh sederhana: tambahkan elemen baru ke path
            filter.path = `${filter.path}/${value}`.replace('//', '/'); // Hindari double '/'
            setFilter({ ...filter });
        }
    }

    useEffect(() => {
        getReferensi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    return (
        <ReferensiContext.Provider value={{ navigation, referensi, filter, getReferensi, onSetFilter, onPrev, onNext }}>
            {children}
        </ReferensiContext.Provider>
    );
}

export const UseReferensiContext = () => {
    return useContext(ReferensiContext);
}