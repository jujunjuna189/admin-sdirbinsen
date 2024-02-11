import { imgKantorSdirsen } from "../../assets";
import { Content } from "../../components";

const DashboardPage = () => {
  return (
    <Content>
      <div className="flex flex-col">
        <div className="w-full overflow-hidden my-3 relative rounded-xl flex justify-center">
          <div className="font-semibold flex py-5 rounded-lg absolute top-16 w-full z-40 flex-col grow text-center">
            <span className="text-white text-4xl">SELAMAT DATANG DIAPLIKASI SDIRSEN</span>
            <span className="text-white text-4xl">PUSENARMED</span>
          </div>
          <div className="absolute top-0 bottom-0 left-0 right-0 bg-slate-900 opacity-80 w-full h-full" />
          <img src={imgKantorSdirsen} alt="Halaman depan sdirsen" className="w-full h-full rounded-xl" />
        </div>
      </div>
    </Content>
  );
};
export default DashboardPage;
