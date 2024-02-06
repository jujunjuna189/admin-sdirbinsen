import { Content } from "../../components";
import { UseProfileContext } from "../../contexts/profile/ProfileContext";


const ProfilePage = () => {
    const { navigation, element, user, permissions, onUserPersonil } = UseProfileContext();

    return (
        <Content element={element}>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 6l-6 6l6 6"></path>
                </svg>
                <span className="font-semibold text-base text-slate-800">Biodata</span>
            </div>
            <div className="flex gap-2 mt-4">
                <div className="w-80">
                    <div className="sticky top-0">
                        <div className="py-4 p-2 border rounded-lg bg-white">
                            <div className="flex justify-center mb-3">
                                <div className="h-24 w-24 border bg-slate-400 rounded-full overflow-hidden">
                                    {user.picture && (<img src={user.picture} alt="ImagePengguna" className="w-full h-full object-cover" />)}
                                </div>
                            </div>
                            <div className="text-center leading-4">
                                <span className="font-semibold text-base">{user.name}</span><br />
                                <div className="flex flex-col gap-1 mt-4">
                                    <div className="py-2 px-2 flex justify-between items-center border rounded-lg border-slate-300">
                                        <span className="font-medium">Username: </span>
                                        <span>{user.username}</span>
                                    </div>
                                    <div className="py-2 px-3 flex justify-between items-center border rounded-lg border-slate-300">
                                        <span className="font-medium">Hak Akses: </span>
                                        <span>{user.role_name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-2 mt-2">
                            <span className="text-base font-medium">Data Biodata Ketentaraan</span>
                        </div>
                        <div className="py-3 p-2 border rounded-lg bg-white flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <div className="h-10 w-10 border bg-slate-400 rounded-full overflow-hidden">
                                    {user.picture && (<img src={user.picture} alt="ImagePengguna" className="w-full h-full object-cover" />)}
                                </div>
                                <div className="flex flex-col leading-4">
                                    <span className="font-semibold">Nama Profile</span>
                                    <small>Jabatan</small>
                                </div>
                            </div>
                            <div className="w-5 h-5 bg-red-50 rounded-full flex justify-center items-center cursor-pointer" onClick={() => onUserPersonil()}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="text-red-700" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M9 6l6 6l-6 6"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex-grow">
                    <div className="px-5 flex flex-col leading-4">
                        <span className="font-semibold">List Akses Dalam Aplikasi</span>
                        <small>Izin aplikasi hanya akan di daftarkan oleh super admin</small>
                        <ul className="flex flex-col gap-1 my-4">
                            {permissions.map((item, index) => {
                                return (
                                    <li className="rounded-md border py-2 px-3" key={index}>
                                        <div className="flex justify-between items-center">
                                            <div className="flex gap-1 items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                    <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" strokeWidth="0" fill="currentColor"></path>
                                                </svg>
                                                {item.display}
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </Content>
    );
}
export default ProfilePage;