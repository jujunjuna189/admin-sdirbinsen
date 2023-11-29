import { Button, Content, InputChecked, InputPassword, InputText } from "../../../../components";
import { UseUserCreateContext } from "../../../../contexts/user/UserCreateContext";
import { RoleModal } from "../../component";

const UserCreatePage = () => {
    const { controller, errors, onSetController, permission, step, stepActive, onTabSwitch, onCheckedPermission, onSaveAndAdd, onSave } = UseUserCreateContext();

    const renderForm = (page) => {
        const form = {
            1: renderUser(),
            2: renderPermission(),
        };

        return form[page];
    }

    const renderUser = () => {
        return (
            <>
                <span className="text-base font-medium">Tambah Pengguna</span>
                <div className="flex flex-col gap-3 mt-3">
                    <div>
                        <span className="font-medium">Nama Lengkap</span>
                        <InputText className="mt-1" value={controller.name} error={errors.name} onChange={(value) => onSetController('name', value)} placeholder="..." />
                    </div>
                    <div>
                        <span className="font-medium">Username</span>
                        <InputText className="mt-1" value={controller.username} error={errors.username} onChange={(value) => onSetController('username', value)} placeholder="..." />
                    </div>
                    <div>
                        <span className="font-medium">Password</span>
                        <InputPassword className="mt-1" value={controller.password} error={errors.password} onChange={(value) => onSetController('password', value)} placeholder="..." />
                    </div>
                    <RoleModal value={controller.role?.name} error={errors.role} onChange={(value) => onSetController('role', value)} />
                </div>
                <div className="flex justify-end mt-8 mb-3 gap-2">
                    <Button className="bg-slate-700 text-white" onClick={() => onTabSwitch(1)}>Selanjutnya</Button>
                </div>
            </>
        );
    }

    const renderPermission = () => {
        return (
            <>
                <div className="flex flex-col">
                    <span className="text-base font-medium">Atur Hak Akses Pengguna</span>
                    {errors.permission_id && (<small className="text-red-800">{errors.permission_id}</small>)}
                </div>
                <div className="flex flex-col gap-2 mt-3">
                    {Object.keys(permission)?.map((item, index) => {
                        return (
                            <div key={index}>
                                <div className="mb-1">
                                    <span className="font-semibold">{item}</span>
                                </div>
                                <div className="flex flex-col gap-2">
                                    {permission[item].map((itemChild, indexChild) => {
                                        return (
                                            <div key={indexChild} className="border rounded-lg py-2 px-3 flex items-center gap-2">
                                                <InputChecked checked={controller.permission?.[itemChild.original_data.id] ?? false} onChange={(value) => onCheckedPermission(item, indexChild, value)} />
                                                <span>{itemChild.original_data.display}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="flex justify-end mt-8 mb-3 gap-2">
                    <Button className="border" onClick={() => onSaveAndAdd()}>{`Simpan & Tambah Lagi`}</Button>
                    <Button className="bg-slate-700 text-white" onClick={() => onSave()}>Simpan</Button>
                </div>
            </>
        );
    }

    return (
        <Content>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => stepActive.nav()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 6l-6 6l6 6"></path>
                </svg>
                <span className="font-semibold text-base text-slate-800">{stepActive.page !== 1 ? 'Sebelumnya' : 'Tambah Pengguna'}</span>
            </div>
            <div className="flex justify-center">
                <div className="w-[652px] max-w-[652px]">
                    <div className="flex items-center mb-4">
                        {step.map((item, index) => {
                            return (
                                <div className="grow flex items-center relative" key={index}>
                                    {index !== 0 && <hr className="grow" />}
                                    <div className={`rounded-full border ${(item.isActive || item.page < stepActive.page) && 'border-red-700 bg-red-50 text-red-700'} w-7 h-7 flex justify-center items-center`}>
                                        <small className="font-semibold">{item.page}</small>
                                    </div>
                                    {index !== (step.length - 1) && <hr className="grow" />}
                                </div>
                            );
                        })}
                    </div>
                    <div className="border rounded-lg p-3 w-full ">
                        {renderForm(stepActive.page)}
                    </div>
                </div>
            </div>
        </Content>
    );
}
export default UserCreatePage;