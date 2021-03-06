import React, { useState, useContext, memo } from "react";

// アイコン付きメニュー
import { IconMenu } from "./IconMenu";

// BaseLink
import { BaseLink } from "../shared_style";

// Contextオブジェクト
import { UserContext } from "../../context/UserProvider";

// ヘッダーをインポート
import { HeaderTitle } from "../Sentences/HeaderTitle";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

// setMobileStateの型
import { SetMobileState } from "../../types/containers/landingPages";

// Headerのタイプ
type HeaderArg = {
  onClickLink?: (modalType: "" | "login" | "signUp") => void;
  setMobileState?: SetMobileState;
};

// LPページの場合、onClickLinkはモーダル管理のstateを更新する関数
// ログインしている場合、onClickLinkは何もない。
// hrefではなく、React RouterのLinkコンポーネントを使用する
export const Header = memo(
  ({ onClickLink, setMobileState }: HeaderArg): JSX.Element => {
    // useContext
    const {
      requestUserState: { sessionState, userState },
    } = useContext(UserContext);

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(e.currentTarget);
    };
    const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(e.currentTarget);
    };

    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };

    const handleMobileState = () => {
      handleCloseNavMenu();
      if (setMobileState) {
        setMobileState((prev) => ({
          ...prev,
          display: true,
          message: "PCからご利用ください",
        }));
      }
    };

    // flexGrowは空いたスペースへの伸び率を表している
    return (
      <>
        <AppBar position="fixed">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{ flexGrow: 1, display: { xs: "inline", md: "inline" } }}
              >
                <HeaderTitle />
              </Box>
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "flex", md: "flex", lg: "none" },
                }}
              >
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "block", lg: "none" },
                  }}
                >
                  <MenuItem
                    key="1"
                    component={BaseLink}
                    to="/rankings"
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">ランキング</Typography>
                  </MenuItem>
                  <MenuItem
                    key="2"
                    component={BaseLink}
                    to="/"
                    onClick={handleMobileState}
                  >
                    <Typography textAlign="center">ログイン</Typography>
                  </MenuItem>
                  <MenuItem
                    key="3"
                    component={BaseLink}
                    to="/"
                    onClick={handleMobileState}
                  >
                    <Typography textAlign="center">新規会員登録</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Box
                sx={{
                  flexGrow: 0,
                  display: { xs: "none", md: "none", lg: "flex" },
                }}
              >
                <Button
                  key="1"
                  sx={{ my: 2, color: "white", display: "block", width: "6vw" }}
                  component={BaseLink}
                  to="/rankings"
                >
                  ランキング
                </Button>
              </Box>
              {sessionState === false && onClickLink && (
                <>
                  <Box
                    sx={{
                      flexGrow: 0,
                      display: { xs: "none", md: "none", lg: "flex" },
                    }}
                  >
                    <Button
                      key="1"
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        width: "6vw",
                        "&:hover": {
                          opacity: 0.7,
                        },
                      }}
                      onClick={() => onClickLink("login")}
                    >
                      ログイン
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      flexGrow: 0,
                      display: { xs: "none", md: "none", lg: "flex" },
                    }}
                  >
                    <Button
                      key="1"
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        width: "7vw",
                        "&:hover": {
                          opacity: 0.7,
                        },
                      }}
                      onClick={() => onClickLink("signUp")}
                    >
                      新規会員登録
                    </Button>
                  </Box>
                </>
              )}
              {sessionState && userState && (
                <IconMenu
                  anchorElUser={anchorElUser}
                  handleOpenUserMenu={handleOpenUserMenu}
                  handleCloseUserMenu={handleCloseUserMenu}
                />
              )}
            </Toolbar>
          </Container>
        </AppBar>
        <Toolbar />
      </>
    );
  }
);
