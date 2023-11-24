import { Button, InputText } from "../../../components";
import { UseLoginContext } from "../../../contexts/auth/LoginContext";

const LoginPage = () => {
    const { controller, errors, onSetController, onLogin } = UseLoginContext();

    return (
        <>
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-gradient-to-r from-red-100 animate-pulse" />
            <div className="absolute top-0 bottom-0 left-0 right-0 opacity-10" style={{ background: "url('https://beredukasi.com/wp-content/uploads/2020/12/photostudio_1606983022872.jpg')", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} />
            <div className="fixed top-0 bottom-0 left-0 right-0 overflow-auto flex justify-center items-center">
                {/* <div className="lg:pr-36 lg:pl-10">
                    <div className="px-5 mt-[2vh] mix-blend-multiply opacity-80">
                        <h2 className="font-bold text-2xl">Selamat Datang Di Aplikasi, Sdirbinsen</h2>
                        <div className="mt-5">
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span>
                        </div>
                    </div>
                </div> */}
                <div>
                    <div className="border py-8 px-5 rounded-lg w-96 bg-white">
                        <div className="font-medium text-center text-lg">Masuk Aplikasi</div>
                        <div className="flex flex-col gap-3 mt-10">
                            {errors.message && (
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
                                <InputText className="mt-1" value={controller.password} error={errors.password} onChange={(value) => onSetController('password', value)} placeholder="..." />
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