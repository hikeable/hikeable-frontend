import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useAuthContext } from "./context/UseAuthContext";
import { Dispatch, SetStateAction } from "react";
import Mountain from "../public/mountain.svg";
import styles from "../styles/logo.module.css";
import { userLoggedBadge } from "../src/UpdateBadges";

export interface INavbar {
  navActive: boolean;
  isLoggedIn: boolean;
  userName: string | null | undefined;
  logOff: (val: boolean) => void;
  setLoggedStatus: Dispatch<SetStateAction<boolean>>;
}

const pages = [""];
const settings = ["Achievements", "Dashboard", "Logout"];

export const Navbar: React.FC<INavbar> = ({
  navActive,
  isLoggedIn,
  userName,
  logOff,
  setLoggedStatus,
}) => {
  const { user, userId, loginWithGoogle, logout, auth } = useAuthContext();
  userName = user?.displayName;
 

  React.useEffect(() => {
    setLoggedStatus(true);
    if (userId) userLoggedBadge(userId);
  }, [userName]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const updateState = (changeSetting: string) => {
    if (changeSetting === "Logout") {
      
      logout(auth);
      logOff(false);
    }
  };

  

  return navActive == true ? (
    <>
      <Box sx={{ flexGrow: 1, mb: "55px" }}>
        <AppBar
          position="fixed"
          sx={{ backgroundColor: "white", borderBottom: "1px solid #b8b388" }}
          elevation={0}
        >
          <Box>
            <Toolbar disableGutters>
              <Link
                href="/"
                style={{
                  textDecoration: "none",
                  display: "flex",
                  marginLeft: "1.5rem",
                }}
              >
                <Mountain className={styles.logo} />
                <Typography
                  sx={{
                    color: "#5e7119",
                    fontSize: "35px",
                    fontFamily: "Montserrat",
                    fontWeight: "600",
                    display: { xs: "none", sm: "block" },
                  }}
                >
                  Hikeable
                </Typography>
              </Link>

              <Button
                sx={{
                  ml: "auto",
                  mr: 0,
                  fontFamily: "Montserrat",

                  backgroundColor: "#304b35",
                  "&:hover": {
                    background: "#64801a",
                  },
                }}
                variant="contained"
                href="/prefectures"
              >
                Map
              </Button>

              <Button
                sx={{
                  ml: 3,
                  mr: 0,
                  fontFamily: "Montserrat",
                  backgroundColor: "#304b35",
                  "&:hover": {
                    background: "#64801a",
                  },
                }}
                variant="contained"
                href="/about"
              >
                About
              </Button>

              {user ? (
                <>
                  <Typography
                    sx={{
                      fontFamily: "Montserrat",
                      fontWeight: "600",
                      color: "#0e2424",
                      display: { xs: "none", sm: "block" },
                      ml: 5,
                    }}
                  >
                    Welcome {userName?.split(" ")[0]}&nbsp;!
                  </Typography>

                  <Box sx={{ flexGrow: 0, ml: 1, mr: 3 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={userName as string}
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        component="a"
                        href={"/" + setting.toLowerCase()}
                        key={setting}
                        onClick={() => updateState(setting)}
                      >
                        <Typography
                          textAlign="center"
                          sx={{ fontFamily: "Montserrat" }}
                        >
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    ml: 3,
                    mr: 3,
                    fontFamily: "Montserrat",
                    background: "#304b35",
                    "&:hover": {
                      background: "#64801a",
                    },
                  }}
                  onClick={() => loginWithGoogle()}
                >
                  Login
                </Button>
              )}
            </Toolbar>
          </Box>
        </AppBar>
      </Box>
    </>
  ) : (
    <></>
  );
};
