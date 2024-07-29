import { imgBg } from "../../../assets";
import { Button, InputPassword, InputText } from "../../../components";
import { UseLoginContext } from "../../../contexts/auth/LoginContext";

const LoginPage = () => {
    const { controller, errors, onSetController, onLogin } = UseLoginContext();

    return (
        <>
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-red-100 animate-pulse" />
            <div className="absolute top-0 bottom-0 left-0 right-0 opacity-[0.15] overflow-hidden flex justify-center items-end">
                <img src={imgBg} alt="BackgroundApp" className="object-cover w-full" />
            </div>
            <div className="fixed top-0 bottom-0 left-0 right-0 overflow-auto flex justify-center items-center">
                <div>
                    <div className="border py-8 px-5 rounded-lg w-96 bg-white">
                        <div className="font-medium text-center text-lg">Masuk Aplikasi</div>
                        <div className="flex flex-col gap-3 mt-10">
                            {errors?.message && (
                                <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg">
                                    <span className="font-semibold text-xs">{errors.message}</span>
                                </div>
                            )}
                            <div>
                                <small className="font-medium">NRP/Username</small>
                                <InputText className="mt-1" value={controller.username} error={errors.username} onChange={(value) => onSetController('username', value)} placeholder="..." />
                            </div>
                            <div>
                                <small className="font-medium">Password</small>
                                <InputPassword className="mt-1" value={controller.password} error={errors.password} onChange={(value) => onSetController('password', value)} placeholder="..." />
                            </div>
                            <div className="mt-5">
                                <Button className="bg-red-800 text-white justify-center" onClick={() => onLogin()}><span className="text-center">Masuk</span></Button>
                            </div>
                            <div className="text-center">
                                <small className="text-slate-800 cursor-pointer">Lupa Kata Sandi?</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LoginPage;