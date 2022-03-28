import React from "react";

// React Router
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

// Presentational Components
import { LandingPages } from './containers/LandingPages';
import { MyPages } from './containers/MyPages';
import { Rankings } from './containers/Rankings';
import { AccountSettings } from './containers/AccountSettings';
import { Games } from './containers/Games';
import { UseTreaties } from './containers/UseTreaties';
import { PrivacyPolicies } from './containers/PrivacyPolicies';
import { PasswordResets } from './containers/PasswordResets';
import { SendEmail } from './containers/SendEmail';
import { PasswordUpdates } from './containers/PasswordUpdates';
import { ExternalAuth } from './containers/ExternalAuth';
import { NotFoundPage } from './containers/NotFoundPage';
import ScrollToTop from './scroll/ScrollToTop';

// Provider
import { UserProvider } from "./context/UserProvider";

// App Component
function App(): JSX.Element {

  return (
    <React.StrictMode>
      <UserProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* LPページ */}
            <Route
              path="/"
              element={<LandingPages />}
            />

            {/* OAuth用のページ */}
            <Route
              path="/callback/:provider/"
              element={<ExternalAuth />}
            />

            {/* マイページ */}
            {/* ログインユーザー以外は見れないページ*/}
            <Route
              path="/my-page"
              element={<MyPages />}
            />

            {/* ランキングページ */}
            <Route
              path="/rankings"
              element={<Rankings />}
            />

            {/* アカウント設定ページ */}
            {/* ログインユーザー以外は見れないページ*/}
            <Route
              path="/account-settings"
              element={<AccountSettings />}
            />

            {/* ゲームページ */}
            <Route
              path="/games/:difficulty/start"
              element={<Games />}
            />

            {/* 利用規約ページ */}
            <Route
              path="/policy"
              element={<UseTreaties />}
            />

            {/* プライバシーポリシーページ */}
            <Route
              path="/privacy-policy"
              element={<PrivacyPolicies />}
            />

            {/* パスワードリセット申請ページ */}
            <Route
              path="/users/password/new"
              element={<PasswordResets />}
            />
            {/* パスワードリセット申請をした後に遷移するページ*/}
            <Route
              path="/users/password/sent"
              element={<SendEmail />}
            />

            {/* パスワード更新ページ */}
            {/* exactの場合、リセットパスワードトークンがURLに含まれていたら反応ないかも*/}
            <Route
              path="/users/password/edit"
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
