import React from "react";

// React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Presentational Components
import { LandingPages } from './containers/LandingPages.jsx';
import { MyPages } from './containers/MyPages.jsx';
import { Rankings } from './containers/Rankings.jsx';
import { AccountSettings } from './containers/AccountSettings.jsx';
import { Games } from './containers/Games.jsx';
import { UseTreaties } from './containers/UseTreaties.jsx';
import { PrivacyPolicies } from './containers/PrivacyPolicies.jsx';
import { PasswordResets } from './containers/PasswordResets.jsx';
import { SendEmail } from './containers/SendEmail.jsx';
import { PasswordUpdates } from './containers/PasswordUpdates.jsx';
import { ExternalAuth } from './containers/ExternalAuth.jsx';
import { NotFoundPage } from './containers/NotFoundPage.jsx';
import ScrollToTop from './scroll/ScrollToTop';

// Provider
import { UserProvider } from "./context/UserProvider";

// App Component
function App() {

  return (
    <React.StrictMode>
      <UserProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* LPページ */}
            <Route
              exact path="/"
              element={<LandingPages />}
            />

            {/* OAuth用のページ */}
            <Route
              exact path="/callback/:provider/"
              element={<ExternalAuth />}
            />

            {/* マイページ */}
            {/* ログインユーザー以外は見れないページ*/}
            <Route
              exact path="/my-page"
              element={<MyPages />}
            />

            {/* ランキングページ */}
            <Route
              exact path="/rankings"
              element={<Rankings />}
            />

            {/* アカウント設定ページ */}
            {/* ログインユーザー以外は見れないページ*/}
            <Route
              exact path="/account-settings"
              element={<AccountSettings />}
            />

            {/* ゲームページ */}
            <Route
              exact path="/games/:difficulty/start"
              element={<Games />}
            />

            {/* 利用規約ページ */}
            <Route
              exact path="/policy"
              element={<UseTreaties />}
            />

            {/* プライバシーポリシーページ */}
            <Route
              exact path="/privacy-policy"
              element={<PrivacyPolicies />}
            />

            {/* パスワードリセット申請ページ */}
            <Route
              exact path="/users/password/new"
              element={<PasswordResets />}
            />
            {/* パスワードリセット申請をした後に遷移するページ*/}
            <Route
              exact path="/users/password/sent"
              element={<SendEmail />}
            />

            {/* パスワード更新ページ */}
            {/* exactの場合、リセットパスワードトークンがURLに含まれていたら反応ないかも*/}
            <Route
              exact path="/users/password/edit"
              element={<PasswordUpdates />}
            />

            {/* どのページにも一致しなかったらこのページにアクセスされる*/}
            <Route
              path="/*"
              element={<NotFoundPage />}
            />
          </Routes>
        </Router>
      </UserProvider>
    </React.StrictMode>
  );
};

export default App;
