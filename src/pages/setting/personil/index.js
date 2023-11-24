import { Button, SettingContent } from "../../../components";
import { UseSettingPersonilContext } from "../../../contexts/setting/SettingPersonilContext";

const SettingPersonilPage = () => {
    const { element, tabs, tabsActive, onTabSwitch, onGetContent } = UseSettingPersonilContext();

    return (
        <SettingContent element={element}>
            <div className="flex gap-3">
                <div className="flex flex-col gap-2 min-w-[10rem]">
                    <div>
                        <small className="font-semibold">Menu Pengaturan...</small>
                    </div>
                    {tabs.map((item, index) => {
                        return (
                            <Button key={index} className={`${item.isActive ? 'border-red-700 bg-red-50 text-red-700' : 'bg-white text-slate-900'} border`} onClick={() => onTabSwitch(index)}>
                                {item.title}
                            </Button>
                        );
                    })}
                </div>
                <div className="grow px-7">
                    <span className="font-bold text-base">{tabsActive.page_title}</span>
                    <div className="my-3">
                        {onGetContent(tabsActive.page)}
                    </div>
                </div>
            </div>
        </SettingContent>
    );
}

export default SettingPersonilPage;