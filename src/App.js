import { Route, Routes } from "react-router-dom";
import { Content, ProtectedAuth } from "./components";
import { AuthContextProvider } from "./contexts/auth/AuthContext";
import { ChatContextProvider } from "./contexts/chat/ChatContext";
import { LoginContextProvider } from "./contexts/auth/LoginContext";
import { MaterialContextProvider } from "./contexts/material/MaterialContext";
import { MaterialCreateContextProvider } from "./contexts/material/MaterialCreateContext";
import { MaterialUpdateContextProvider } from "./contexts/material/MaterialUpdateContext";
import { PersonilContextProvider } from "./contexts/personil/PersonilContext";
import { PersonilCreateContextProvider } from "./contexts/personil/PersonilCreateContext";
import { PersonilDetailContextProvider } from "./contexts/personil/PersonilDetailContext";
import { PersonilUpdateContextProvider } from "./contexts/personil/PersonilUpdateContext";
import { ProfileContextProvider } from "./contexts/profile/ProfileContext";
import { SettingPersonilContextProvider } from "./contexts/setting/SettingPersonilContext";
import { SettingSatuanCreateContextProvider } from "./contexts/setting/SettingSatuanCreate";
import { SettingUserContextProvider } from "./contexts/setting/SettingUserContext";
import { UserContextProvider } from "./contexts/user/UserContext";
import { UserCreateContextProvider } from "./contexts/user/UserCreateContext";
import { UserDetailContextProvider } from "./contexts/user/UserDetailContext";
import { TrakorpsContextProvider } from "./contexts/trakorps/TrakorpsContext";
import { TrakorpsCreateContextProvider } from "./contexts/trakorps/TrakorpsCreateContext";
import { TrakorpsDetailContextProvider } from "./contexts/trakorps/TrakorpsDetailContext";
import { SiapsatContextProvider } from "./contexts/siapsat/SiapsatContext";
import { SiapsatCreateContextProvider } from "./contexts/siapsat/SIapsatCreateContext";
import { SiapsatUpdateContextProvider } from "./contexts/siapsat/SiapsatUpdateContext";

import {
  ChatPage,
  DashboardPage,
  LoginPage,
  MaterialCreatePage,
  MaterialPage,
  MaterialUpdatePage,
  PersonilCreatePage,
  PersonilDetailPage,
  PersonilDetailRhPage,
  PersonilPage,
  PersonilUpdatePage,
  ProfilePage,
  SettingPersonilPage,
  SettingSatuanCreatePage,
  SettingUserPage,
  SiapsatCreatePage,
  SiapsatPage,
  SiapsatUpdatePage,
  TrakorpsCreatePage,
  TrakorpsDetailPage,
  TrakorpsPage,
  UserCreatePage,
  UserDetailPage,
  UserPage,
} from "./pages";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route
          path="/"
          element={
            <LoginContextProvider>
              <LoginPage />
            </LoginContextProvider>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedAuth>
              <ProfileContextProvider>
                <ProfilePage />
              </ProfileContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedAuth>
              <DashboardPage />
            </ProtectedAuth>
          }
        />
        {/* User */}
        <Route
          path="/user"
          element={
            <ProtectedAuth>
              <UserContextProvider>
                <UserPage />
              </UserContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/user/detail/:id"
          element={
            <ProtectedAuth>
              <UserDetailContextProvider>
                <UserDetailPage />
              </UserDetailContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/user/create"
          element={
            <ProtectedAuth>
              <UserCreateContextProvider>
                <UserCreatePage />
              </UserCreateContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Trakorps */}
        <Route
          path="/trakorps"
          element={
            <ProtectedAuth>
              <TrakorpsContextProvider>
                <TrakorpsPage />
              </TrakorpsContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/trakorps/create"
          element={
            <ProtectedAuth>
              <TrakorpsCreateContextProvider>
                <TrakorpsCreatePage />
              </TrakorpsCreateContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/trakorps/detail/:id"
          element={
            <ProtectedAuth>
              <TrakorpsDetailContextProvider>
                <TrakorpsDetailPage />
              </TrakorpsDetailContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Personil */}
        <Route
          path="/personil"
          element={
            <ProtectedAuth>
              <PersonilContextProvider>
                <PersonilPage />
              </PersonilContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/personil/detail/:id"
          element={
            <ProtectedAuth>
              <PersonilDetailContextProvider>
                <PersonilDetailPage />
              </PersonilDetailContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/personil/detail_rh/:id"
          element={
            <ProtectedAuth>
              <PersonilDetailContextProvider>
                <PersonilDetailRhPage />
              </PersonilDetailContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/personil/create"
          element={
            <ProtectedAuth>
              <PersonilCreateContextProvider>
                <PersonilCreatePage />
              </PersonilCreateContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/personil/update/:id"
          element={
            <ProtectedAuth>
              <PersonilUpdateContextProvider>
                <PersonilUpdatePage />
              </PersonilUpdateContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Peta jabatan */}
        <Route
          path="/personil/peta_jabatan"
          element={
            <Content>Coming Soon</Content>
          }
        />
        {/* komposisi Personil */}
        <Route
          path="/personil/komposisi_personil"
          element={
            <Content>Coming Soon</Content>
          }
        />
        {/* Material */}
        <Route
          path="/material"
          element={
            <ProtectedAuth>
              <MaterialContextProvider>
                <MaterialPage />
              </MaterialContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/material/create/:kategori"
          element={
            <ProtectedAuth>
              <MaterialCreateContextProvider>
                <MaterialCreatePage />
              </MaterialCreateContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/material/update/:id"
          element={
            <ProtectedAuth>
              <MaterialUpdateContextProvider>
                <MaterialUpdatePage />
              </MaterialUpdateContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Binsiapsat */}
        <Route
          path="/siapsat"
          element={
            <ProtectedAuth>
              <SiapsatContextProvider>
                <SiapsatPage />
              </SiapsatContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/siapsat/create/:kategori"
          element={
            <ProtectedAuth>
              <SiapsatCreateContextProvider>
                <SiapsatCreatePage />
              </SiapsatCreateContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/siapsat/update/:id"
          element={
            <ProtectedAuth>
              <SiapsatUpdateContextProvider>
                <SiapsatUpdatePage />
              </SiapsatUpdateContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Rencana Binsat */}
        <Route
          path="/siapsat/rencana_binsat"
          element={
            <Content>Coming Soon</Content>
          }
        />
        {/* Laporan Binsat */}
        <Route
          path="/siapsat/laporan_binsat"
          element={
            <Content>Coming Soon</Content>
          }
        />
        {/* Laporan Satuan */}
        <Route
          path="/siapsat/laporan_satuan"
          element={
            <Content>Coming Soon</Content>
          }
        />
        {/* Setting User */}
        <Route
          path="/setting/user"
          element={
            <ProtectedAuth>
              <SettingUserContextProvider>
                <SettingUserPage />
              </SettingUserContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Setting Personil */}
        <Route
          path="/setting/personil"
          element={
            <ProtectedAuth>
              <SettingPersonilContextProvider>
                <SettingPersonilPage />
              </SettingPersonilContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/setting/personil/satuan/create"
          element={
            <ProtectedAuth>
              <SettingSatuanCreateContextProvider>
                <SettingSatuanCreatePage />
              </SettingSatuanCreateContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Chat */}
        <Route
          path="/chat"
          element={
            <ProtectedAuth>
              <ChatContextProvider>
                <ChatPage />
              </ChatContextProvider>
            </ProtectedAuth>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
