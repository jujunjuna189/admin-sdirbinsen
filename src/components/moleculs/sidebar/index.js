import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../../../utils";

const Sidebar = (props) => {
  const navigation = useNavigate();
  const [dropDown, setDropDown] = useState(JSON.parse(localStorage.getItem('sdirbinsen.dropDown')) ?? {});

  return (
    <aside className="relative w-[13rem] w-min-[13rem] w-max-[13rem] border-e bg-white">
      <div className="px-2 py-3 mb-3 border-y cursor-pointer">
        <div className="flex gap-3 justify-center text-sm">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M15 6l-6 6l6 6"></path>
          </svg> */}
          {/* <span className="font-medium">Sembunyikan Menu</span> */}
          <span className="font-medium text-slate-600">Menu Aplikasi</span>
        </div>
      </div>
      {getLocalUser()?.auth?.permission?.["pengguna.menu"] && (
        <div className="px-4 py-3 cursor-pointer hover:bg-slate-100 flex justify-between items-center" onClick={() => navigation("/user")}>
          <div className="flex gap-3 items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-800"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1"></path>
              <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M17 10h2a2 2 0 0 1 2 2v1"></path>
              <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"></path>
              <path d="M3 13v-1a2 2 0 0 1 2 -2h2"></path>
            </svg>
            <span className="font-medium">Pengguna</span>
          </div>
        </div>
      )}
      {getLocalUser()?.auth?.permission?.["trakorps.menu"] && (
        <div className="px-4 py-3 cursor-pointer hover:bg-slate-100 flex justify-between items-center" onClick={() => navigation("/trakorps")}>
          <div className="flex gap-3 items-center text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-red-800"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M14 3v4a1 1 0 0 0 1 1h4" />
              <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
              <path d="M11 14h1v4h1" />
              <path d="M12 11h.01" />
            </svg>
            <span className="font-medium">Trakorps</span>
          </div>
        </div>
      )}
      {getLocalUser()?.auth?.permission?.["binman.menu"] && (
        <div className="cursor-pointer">
          <div className="flex gap-3 items-center text-sm px-4 py-3 hover:bg-slate-100" onClick={() => { setDropDown({ ...dropDown, binman: !dropDown.binman }); localStorage.setItem('sdirbinsen.dropDown', JSON.stringify({ ...dropDown, binman: !dropDown.binman })); }}>
            <svg width="22" height="18" viewBox="0 0 28 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.33816 10.8919L7.338 10.8921L7.33784 10.8923L7.33773 10.8924L7.33744 10.8928L7.24611 11.0151L7.19534 11.1606C7.1179 11.3826 7.07236 11.6121 7.05764 11.8432L7.01781 11.8594L6.99721 11.8678L6.97701 11.8771C6.24694 12.2132 5.62867 12.7307 5.1723 13.3665C5.32283 13.0669 5.40546 12.7313 5.40546 12.3829V12.0095C5.40546 11.7224 5.35841 11.439 5.26723 11.1695L5.21598 11.018L5.121 10.8913L5.12081 10.8911L5.12051 10.8907L5.1203 10.8904L5.12006 10.8901L5.1197 10.8896L5.11071 10.8773C5.10196 10.8653 5.08788 10.8457 5.06921 10.8192C5.03184 10.7661 4.97635 10.6853 4.90876 10.5813C4.77304 10.3725 4.59151 10.0746 4.41067 9.72231C4.03531 8.99107 3.72207 8.13833 3.72207 7.39526C3.72207 5.39667 4.93692 4.36206 6.22803 4.36206C6.74257 4.36206 7.21263 4.51867 7.60373 4.80579C7.59555 4.94783 7.5907 5.09387 7.5907 5.24369C7.5907 6.54803 7.9903 7.81603 8.43721 8.83733C8.25303 9.33941 8.01213 9.80886 7.79545 10.1813C7.66444 10.4065 7.54642 10.5892 7.46251 10.7137C7.42066 10.7758 7.38756 10.8231 7.36591 10.8534L7.34244 10.886L7.33816 10.8919ZM4.12606 14.3757C4.44163 14.2313 4.7113 14.0177 4.92055 13.7578C4.66535 14.2027 4.48362 14.6928 4.38936 15.2105L4.37884 15.2664L4.36879 15.3197L4.36458 15.3739L4.26634 16.6364H1.0447C1.02975 16.6364 1.0199 16.6306 1.01406 16.6243L1.01407 16.6243L1.00987 16.6198C1.00423 16.6137 0.999083 16.6032 1.00014 16.5883C1.00014 16.5882 1.00015 16.5881 1.00016 16.588L1.03888 16.0923C1.10603 15.7985 1.30301 15.5503 1.57496 15.4189L4.0881 14.3922L4.10725 14.3843L4.12606 14.3757Z"
                stroke="#8B0000"
                strokeWidth="2"
              />
              <path
                d="M23.8732 14.3757L23.8921 14.3844L23.9114 14.3923L26.4261 15.419C26.698 15.5504 26.8946 15.7985 26.9611 16.0916L26.9999 16.5882C26.9999 16.5883 26.9999 16.5884 26.9999 16.5885C27.0009 16.6031 26.9959 16.6136 26.9901 16.6198L26.9901 16.6197L26.9845 16.6258C26.9803 16.6305 26.9715 16.6364 26.9562 16.6364H23.7332L23.6355 15.3734L23.6319 15.327L23.624 15.2812L23.6137 15.2214L23.6138 15.2214L23.6117 15.2103C23.5163 14.6898 23.333 14.1982 23.0744 13.7518C23.2838 14.0141 23.5547 14.23 23.8732 14.3757ZM22.5955 12.3829C22.5955 12.7373 22.6808 13.079 22.8365 13.3832C22.372 12.7345 21.7359 12.2055 20.9745 11.8572L20.9555 11.8485L20.9431 11.8435C20.9282 11.6113 20.8823 11.3849 20.8094 11.1695L20.7584 11.0186L20.6639 10.8924L20.6637 10.892L20.6635 10.8918L20.6634 10.8916L20.6632 10.8914L20.6589 10.8855L20.6354 10.8529C20.6138 10.8225 20.5806 10.7753 20.5387 10.7131C20.4547 10.5886 20.3365 10.4058 20.2054 10.1806C19.9884 9.80789 19.7474 9.33829 19.5634 8.83629C20.0096 7.81499 20.4084 6.54707 20.4084 5.24364C20.4084 5.09413 20.4036 4.94846 20.3954 4.80666C20.7876 4.51846 21.2575 4.36206 21.7703 4.36206C23.0651 4.36206 24.2788 5.39701 24.2788 7.39526C24.2788 8.13846 23.9657 8.99127 23.5905 9.72251C23.4098 10.0748 23.2284 10.3727 23.0927 10.5816C23.0252 10.6855 22.9697 10.7663 22.9324 10.8194C22.9137 10.8459 22.8996 10.8655 22.8909 10.8775L22.8819 10.8898L22.8815 10.8903L22.8813 10.8906L22.8811 10.8909L22.8808 10.8913L22.8806 10.8915L22.7885 11.0144L22.7375 11.1609C22.6406 11.4387 22.5955 11.7256 22.5955 12.0095V12.3829Z"
                stroke="#8B0000"
                strokeWidth="2"
              />
              <path
                d="M20.5582 16.6363H13.9996H7.44205L7.51195 15.7369C7.60329 15.31 7.88801 14.9493 8.28188 14.7625L11.3309 13.5162L11.3511 13.5079L11.371 13.4988C12.2351 13.1006 12.7942 12.2347 12.7942 11.2798V10.8269C12.7942 10.5016 12.7396 10.1795 12.6353 9.87449L12.5841 9.72466L12.4899 9.59902L12.4898 9.59891L12.4895 9.59857L12.4893 9.59831L12.4891 9.59799L12.4878 9.5962L12.476 9.58011C12.4648 9.56472 12.4471 9.54018 12.4239 9.50715C12.3773 9.44103 12.3088 9.34125 12.2255 9.21314C12.0584 8.95608 11.835 8.58951 11.6123 8.15563C11.1533 7.2613 10.7562 6.1936 10.7562 5.24363C10.7562 2.72932 12.3006 1.36365 13.9996 1.36365C15.6994 1.36365 17.2431 2.72913 17.2431 5.24363C17.2431 6.1938 16.8463 7.26163 16.3877 8.15594C16.1651 8.58984 15.942 8.95641 15.775 9.21348C15.6918 9.34158 15.6233 9.44137 15.5768 9.50749C15.5536 9.54052 15.5359 9.56506 15.5247 9.58044L15.5129 9.59653L15.5116 9.59833L15.5114 9.59864L15.5112 9.5989L15.5109 9.59925L20.5582 16.6363ZM20.5582 16.6363L20.4891 15.7378C20.3962 15.3097 20.1107 14.9492 19.7173 14.7624L20.5582 16.6363Z"
                stroke="#8B0000"
                strokeWidth="2"
              />
            </svg>
            <span className="font-medium">Binman</span>
          </div>
          {/* Dub Menu */}
          <div className={`${dropDown.binman ? 'block' : 'hidden'}`}>
            <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] py-2" onClick={() => navigation("/personil")}>
              <div className="flex gap-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                <span className="font-medium">Data Personel</span>
              </div>
            </div>
            <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] py-2" onClick={() => navigation("/personil/peta_jabatan")}>
              <div className="flex gap-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                <span className="font-medium">Peta Jabatan</span>
              </div>
            </div>
            <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] py-2" onClick={() => navigation("/personil/kompers_satjar")}>
              <div className="flex gap-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                <span className="font-medium">Kompers Satjar</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {getLocalUser()?.auth?.permission?.["binmat.menu"] && (
        <div className="cursor-pointer" onClick={() => navigation("/material")}>
          <div className="flex justify-between items-center hover:bg-slate-100 px-4 py-3">
            <div className="flex gap-3 items-center text-sm">
              <svg width="22" height="22" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6.45833 10.6666C6.45833 10.1834 6.85008 9.79165 7.33333 9.79165H16.6667C17.1499 9.79165 17.5417 10.1834 17.5417 10.6666C17.5417 11.1499 17.1499 11.5416 16.6667 11.5416H7.33333C6.85008 11.5416 6.45833 11.1499 6.45833 10.6666Z"
                  fill="#8B0000"
                />
                <path
                  d="M6.45833 15.3333C6.45833 14.8501 6.85008 14.4583 7.33333 14.4583H16.6667C17.1499 14.4583 17.5417 14.8501 17.5417 15.3333C17.5417 15.8166 17.1499 16.2083 16.6667 16.2083H7.33333C6.85008 16.2083 6.45833 15.8166 6.45833 15.3333Z"
                  fill="#8B0000"
                />
                <path
                  d="M6.45833 20C6.45833 19.5167 6.85008 19.125 7.33333 19.125H10.8333C11.3166 19.125 11.7083 19.5167 11.7083 20C11.7083 20.4832 11.3166 20.875 10.8333 20.875H7.33333C6.85008 20.875 6.45833 20.4832 6.45833 20Z"
                  fill="#8B0000"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.7045 0.555991C17.9582 0.654514 19.0057 0.856993 19.9079 1.31194C20.1541 1.43608 20.3874 1.57793 20.6097 1.73949C21.1792 2.15326 21.6801 2.65408 22.0938 3.22359C22.7773 4.1643 23.0833 5.26608 23.2306 6.62587C23.375 7.95836 23.375 9.63788 23.375 11.7805V14.2195C23.375 16.3621 23.375 18.0416 23.2306 19.3741C23.0833 20.7339 22.7773 21.8357 22.0938 22.7764C21.6801 23.3459 21.1792 23.8467 20.6097 24.2605C19.669 24.9439 18.5672 25.25 17.2074 25.3973C15.875 25.5417 14.1954 25.5417 12.0528 25.5416H11.9472C9.80457 25.5417 8.12504 25.5417 6.79256 25.3973C5.43276 25.25 4.33099 24.9439 3.39027 24.2605C2.82077 23.8467 2.31994 23.3459 1.90618 22.7764C1.22271 21.8357 0.916674 20.7339 0.769349 19.3741C0.624983 18.0416 0.62499 16.3621 0.625 14.2194V11.7805C0.62499 9.6379 0.624983 7.95836 0.769349 6.62587C0.916674 5.26608 1.22271 4.1643 1.90618 3.22359C2.31995 2.65409 2.82077 2.15326 3.39027 1.73949C3.81921 1.42785 4.28482 1.19242 4.79886 1.01505C5.64905 0.7217 6.6295 0.588597 7.78231 0.523323C8.93051 0.45831 10.3112 0.458312 11.9762 0.458313H12.0356C13.9314 0.458309 15.4614 0.458306 16.7045 0.555991ZM16.5674 2.30061C15.4007 2.20893 13.9387 2.20831 12 2.20831C10.3066 2.20831 8.97446 2.20863 7.88124 2.27052C7.5003 2.29209 7.15588 2.32086 6.84236 2.3583C7.81274 3.31725 8.59237 4.05697 9.28834 4.614C10.2245 5.36327 10.932 5.71673 11.649 5.83028C12.1629 5.91167 12.6864 5.91167 13.2003 5.83028C13.8972 5.7199 14.5854 5.38275 15.4832 4.6757C16.1689 4.13567 16.936 3.41376 17.8907 2.47295C17.5108 2.39682 17.0753 2.34053 16.5674 2.30061ZM19.6427 3.20074C18.4431 4.39471 17.4563 5.34934 16.566 6.05054C15.5443 6.85516 14.5802 7.38353 13.474 7.55874C12.7788 7.66886 12.0705 7.66886 11.3752 7.55874C10.2372 7.37849 9.2495 6.82441 8.19482 5.98028C7.25045 5.22444 6.19101 4.18417 4.8796 2.87475C4.71486 2.95786 4.56249 3.05094 4.4189 3.15527C3.99796 3.4611 3.62779 3.83127 3.32196 4.25221C2.89136 4.84488 2.64036 5.60347 2.50917 6.81437C2.3762 8.04164 2.375 9.62648 2.375 11.8333V14.1666C2.375 16.3735 2.3762 17.9583 2.50917 19.1856C2.64036 20.3965 2.89136 21.1551 3.32196 21.7477C3.62779 22.1687 3.99796 22.5389 4.4189 22.8447C5.01157 23.2753 5.77016 23.5263 6.98105 23.6575C8.20832 23.7904 9.79317 23.7916 12 23.7916C14.2068 23.7916 15.7917 23.7904 17.0189 23.6575C18.2298 23.5263 18.9884 23.2753 19.5811 22.8447C20.002 22.5389 20.3722 22.1687 20.678 21.7477C21.1086 21.1551 21.3596 20.3965 21.4908 19.1856C21.6238 17.9583 21.625 16.3735 21.625 14.1666V11.8333C21.625 9.62648 21.6238 8.04164 21.4908 6.81437C21.3596 5.60347 21.1086 4.84488 20.678 4.25221C20.3872 3.85192 20.0382 3.49754 19.6427 3.20074Z"
                  fill="#8B0000"
                />
              </svg>
              <span className="font-medium">Binmat</span>
            </div>
          </div>
        </div>
      )}
      {getLocalUser()?.auth?.permission?.["siapsat.menu"] && (
        <div className="cursor-pointer">
          <div className="flex justify-between items-center hover:bg-slate-100 px-4 py-3" onClick={() => { setDropDown({ ...dropDown, binsiapsat: !dropDown.binsiapsat }); localStorage.setItem('sdirbinsen.dropDown', JSON.stringify({ ...dropDown, binsiapsat: !dropDown.binsiapsat })); }}>
            <div className="flex gap-3 items-center text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                className="text-red-800"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 17v-12c0 -1.121 -.879 -2 -2 -2s-2 .879 -2 2v12l2 2l2 -2z" />
                <path d="M16 7h4" />
                <path d="M18 19h-13a2 2 0 1 1 0 -4h4a2 2 0 1 0 0 -4h-3" />
              </svg>
              <span className="font-medium">Binsiapsat</span>
            </div>
          </div>
          {/* sub menu */}
          <div className={`${dropDown.binsiapsat ? 'block' : 'hidden'}`}>
            <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] py-2" onClick={() => navigation("/siapsat/binsat_renlakgiat")}>
              <div className="flex gap-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                <span className="font-medium">Data Binsat</span>
              </div>
            </div>
            <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] py-2" onClick={() => navigation("/siapsat/lapsat_induk")}>
              <div className="flex gap-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                <span className="font-medium">Data Lapsat</span>
              </div>
            </div>
            <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] py-2" onClick={() => navigation("/siapsat/ekko_induk")}>
              <div className="flex gap-2 items-center text-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                <span className="font-medium">Data Ekko</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Smart Book */}
      <div className="cursor-pointer">
        <div className="flex justify-between items-center hover:bg-slate-100 px-4 py-3" onClick={() => { setDropDown({ ...dropDown, smartBook: !dropDown.smartBook }); localStorage.setItem('sdirbinsen.dropDown', JSON.stringify({ ...dropDown, smartBook: !dropDown.smartBook })); }}>
          <div className="flex gap-3 items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M9 4m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z" /><path d="M5 8h4" /><path d="M9 16h4" /><path d="M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041z" /><path d="M14 9l4 -1" /><path d="M16 16l3.923 -.98" /></svg>
            <span className="font-medium">Buku Pintar</span>
          </div>
        </div>
        {/* sub menu */}
        <div className={`${dropDown.smartBook ? 'block' : 'hidden'}`}>
          <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] pr-2 py-2 relative" onClick={() => { setDropDown({ ...dropDown, smartBookSub: dropDown.smartBookSub === 'alutsista' ? '' : 'alutsista' }); localStorage.setItem('sdirbinsen.dropDown', JSON.stringify({ ...dropDown, smartBookSub: dropDown.smartBookSub === 'alutsista' ? '' : 'alutsista' })); }}>
            <div className="flex gap-2 items-center grow justify-between text-sm">
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                <span className="font-medium">Data Alutsista</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
            </div>
            {/* Sub menu */}
            <div className={`absolute left-[13.6rem] bg-white rounded-md z-10 shadow-all border ${dropDown.smartBookSub === 'alutsista' ? 'block' : 'hidden'}`}>
              <div className="px-2 pb-1 pt-2">
                <span className="font-semibold whitespace-pre">Sub menu data Alutsista</span>
              </div>
              <hr />
              <div className="text-start">
                <div className="hover:bg-slate-100 pl-[1rem] py-2" onClick={() => navigation("/learning/alutsista", { state: { category: "yonarmed-rocket" } })}>
                  <span>Yonarmed Roket</span>
                </div>
                <div className="hover:bg-slate-100 pl-[1rem] py-2" onClick={() => navigation("/learning/alutsista", { state: { category: "yonarmed-sedang" } })}>
                  <span>Yonarmed Sedang</span>
                </div>
                <div className="hover:bg-slate-100 pl-[1rem] py-2" onClick={() => navigation("/learning/alutsista", { state: { category: "yonarmed-ringan" } })}>
                  <span>Yonarmed Ringan</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] pr-2 py-2 relative" onClick={() => navigation("/learning/munisi")}>
            <div className="flex gap-2 items-center grow justify-between text-sm">
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                <span className="font-medium">Data Munisi</span>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] pr-2 py-2 relative" onClick={() => { setDropDown({ ...dropDown, smartBookSub: dropDown.smartBookSub === 'responsibility' ? '' : 'responsibility' }); localStorage.setItem('sdirbinsen.dropDown', JSON.stringify({ ...dropDown, smartBookSub: dropDown.smartBookSub === 'responsibility' ? '' : 'responsibility' })); }}>
            <div className="flex gap-2 items-center grow justify-between text-sm">
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
                <span className="font-medium text-xs">Tugas dan Tanggung Jawab</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
            </div>
            {/* Sub menu */}
            <div className={`absolute left-[13.6rem] bg-white rounded-md z-10 shadow-all border ${dropDown.smartBookSub === 'responsibility' ? 'block' : 'hidden'}`}>
              <div className="px-2 pb-1 pt-2 flex flex-col">
                <span className="font-semibold whitespace-pre">Sub menu data</span>
                <span className="font-semibold whitespace-pre">Tugas dan Tanggung Jawab</span>
              </div>
              <hr />
              <div className="text-start">
                <div className="hover:bg-slate-100 pl-[1rem] py-2" onClick={() => navigation("/learning/responsibility")}>
                  <span>Yonarmed Roket</span>
                </div>
                <div className="hover:bg-slate-100 pl-[1rem] py-2" onClick={() => navigation("/learning/responsibility")}>
                  <span>Yonarmed Sedang</span>
                </div>
                <div className="hover:bg-slate-100 pl-[1rem] py-2" onClick={() => navigation("/learning/responsibility")}>
                  <span>Yonarmed Ringan</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] py-2" onClick={() => navigation("/learning/satuan")}>
            <div className="flex gap-2 items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
              <span className="font-medium text-xs">Lambang dan Sejarah Satuan</span>
            </div>
          </div>
          <div className="flex justify-between items-center hover:bg-slate-100 pl-[2.1rem] py-2" onClick={() => navigation("/learning/pejabat-satuan")}>
            <div className="flex gap-2 items-center text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
              <span className="font-medium text-xs">Pejabat Satuan Armed</span>
            </div>
          </div>
        </div>
      </div>
      {/* Chat feature */}
      <div className="cursor-pointer" onClick={() => navigation("/chat")}>
        <div className="flex justify-between items-center hover:bg-slate-100 px-4 py-3">
          <div className="flex gap-3 items-center text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-red-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" /><path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" /></svg>
            <span className="font-medium">Kirim Pesan</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
