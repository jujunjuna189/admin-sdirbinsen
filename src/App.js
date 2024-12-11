import { Route, Routes } from "react-router-dom";
import { ProtectedAuth } from "./components";
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
import { PetaJabatanContextProvider } from "./contexts/peta_jabatan/PetaJabatanContext";
import { PetaJabatanCreateContextProvider } from "./contexts/peta_jabatan/PetaJabatanCreateContext";
import { PetaJabatanUpdateContextProvider } from "./contexts/peta_jabatan/PetaJabatanUpdateContext";
import { KompersSatjarContextProvider } from "./contexts/kompers_satjat/KompersSatjarContext";
import { KompersSatjarCategoryCreateContextProvider } from "./contexts/kompers_satjat/KompersSatjarCategoryCreateContext";
import { KompersSatjarCreateContextProvider } from "./contexts/kompers_satjat/KompersSatjarCreateContext";
import { KompersSatjarDetailContextProvider } from "./contexts/kompers_satjat/KompersSatjarDetailContext";
import { KompersSatjarUpdateContextProvider } from "./contexts/kompers_satjat/KompersSatjarUpdateContext";

import {
  AnnouncementCreatePage,
  AnnouncementPage,
  AnnouncementUpdatePage,
  ChatPage,
  DashboardPage,
  HelpSuggestionPage,
  HelpTicketPage,
  HelpTutorialPage,
  KompersSatjarCategoryCreatePage,
  KompersSatjarCreatePage,
  KompersSatjarDetailPage,
  KompersSatjarPage,
  KompersSatjarUpdatePage,
  LearningCreatePage,
  LearningPage,
  LearningUpdatePage,
  LoginPage,
  MaterialCreatePage,
  MaterialPage,
  MaterialUpdatePage,
  PersonilCreatePage,
  PersonilDetailPage,
  PersonilDetailRhPage,
  PersonilPage,
  PersonilUpdatePage,
  PetaJabatanCreatePage,
  PetaJabatanPage,
  PetaJabatanUpdatePage,
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
import { LearningContextProvider } from "./contexts/learning/LearningContext";
import { LearningCreateContextProvider } from "./contexts/learning/LearningCreateContext";
import { LearningUpdateContextProvider } from "./contexts/learning/LearningUpdateContext";
import { AnnouncementContextProvider } from "./contexts/announcement/AnnouncementContext";
import { AnnouncementCreateContextProvider } from "./contexts/announcement/AnnouncementCreateContext";
import { AnnouncementUpdateContextProvider } from "./contexts/announcement/AnnouncementUpdateContext";
import { SiapsatContextProvider } from "./contexts/siapsat/SiapsatContext";
import { SiapsatCreateContextProvider } from "./contexts/siapsat/SiapsatCreateContext";
import { SiapsatUpdateContextProvider } from "./contexts/siapsat/SiapsatUpdateContext";

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
            <ProtectedAuth>
              <PetaJabatanContextProvider>
                <PetaJabatanPage />
              </PetaJabatanContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/personil/peta_jabatan/create"
          element={
            <ProtectedAuth>
              <PetaJabatanCreateContextProvider>
                <PetaJabatanCreatePage />
              </PetaJabatanCreateContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/personil/peta_jabatan/update/:id"
          element={
            <ProtectedAuth>
              <PetaJabatanUpdateContextProvider>
                <PetaJabatanUpdatePage />
              </PetaJabatanUpdateContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Komperst Satja Personil */}
        <Route
          path="/personil/kompers_satjar"
          element={
            <ProtectedAuth>
              <KompersSatjarContextProvider>
                <KompersSatjarPage />
              </KompersSatjarContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/personil/kompers_satjar/detail/:id"
          element={
            <ProtectedAuth>
              <KompersSatjarDetailContextProvider>
                <KompersSatjarDetailPage />
              </KompersSatjarDetailContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/personil/kompers_satjar/create/:kompers_satjar_category_id"
          element={
            <ProtectedAuth>
              <KompersSatjarCreateContextProvider>
                <KompersSatjarCreatePage />
              </KompersSatjarCreateContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/personil/kompers_satjar/update/:id"
          element={
            <ProtectedAuth>
              <KompersSatjarUpdateContextProvider>
                <KompersSatjarUpdatePage />
              </KompersSatjarUpdateContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Kompers satjar catery */}
        <Route
          path="/personil/kompers_satjar_category"
          element={
            <ProtectedAuth>
              <KompersSatjarCategoryCreateContextProvider>
                <KompersSatjarCategoryCreatePage />
              </KompersSatjarCategoryCreateContextProvider>
            </ProtectedAuth>
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
          path="/siapsat/create"
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
        {/* Learning */}
        <Route
          path="/learning"
          element={
            <ProtectedAuth>
              <LearningContextProvider>
                <LearningPage />
              </LearningContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/learning/create"
          element={
            <ProtectedAuth>
              <LearningCreateContextProvider>
                <LearningCreatePage />
              </LearningCreateContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/learning/update/:id"
          element={
            <ProtectedAuth>
              <LearningUpdateContextProvider>
                <LearningUpdatePage />
              </LearningUpdateContextProvider>
            </ProtectedAuth>
          }
        />
        {/* Announcement */}
        <Route
          path="/announcement"
          element={
            <ProtectedAuth>
              <AnnouncementContextProvider>
                <AnnouncementPage />
              </AnnouncementContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/announcement/create"
          element={
            <ProtectedAuth>
              <AnnouncementCreateContextProvider>
                <AnnouncementCreatePage />
              </AnnouncementCreateContextProvider>
            </ProtectedAuth>
          }
        />
        <Route
          path="/announcement/update/:id"
          element={
            <ProtectedAuth>
              <AnnouncementUpdateContextProvider>
                <AnnouncementUpdatePage />
              </AnnouncementUpdateContextProvider>
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
        {/* Setting personil satuan */}
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
        {/* Help Center */}
        <Route
          path="/help-center/tutorial"
          element={
            <ProtectedAuth>
              <HelpTutorialPage />
            </ProtectedAuth>
          }
        />
        <Route
          path="/help-center/ticket"
          element={
            <ProtectedAuth>
              <HelpTicketPage />
            </ProtectedAuth>
          }
        />
        <Route
          path="/help-center/suggestion"
          element={
            <ProtectedAuth>
              <HelpSuggestionPage />
            </ProtectedAuth>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
