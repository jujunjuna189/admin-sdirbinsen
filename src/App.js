import { Route, Routes } from "react-router-dom";
import { ProtectedAuth } from "./components";
import { AuthContextProvider } from "./contexts/auth/AuthContext";
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
import {
  DashboardPage,
  LoginPage,
  MaterialCreatePage,
  MaterialPage,
  MaterialUpdatePage,
  PersonilCreatePage,
  PersonilDetailPage,
  PersonilPage,
  PersonilUpdatePage,
  ProfilePage,
  SettingPersonilPage,
  SettingSatuanCreatePage,
  SettingUserPage,
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
        {/* Material */}
        <Route
          path="/material/:kategori"
          element={
            <ProtectedAuth>
              <MaterialContextProvider>
                <MaterialPage />
              </MaterialContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/material/create"
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
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
