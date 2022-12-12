import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useAuthContext } from "./context/UseAuthContext";
import { Dispatch, SetStateAction } from "react";
// import { Logo } from "./Logo";
import Mountain from "../public/mountain.svg";
import styles from "../styles/logo.module.css";

export interface INavbar {
  navActive: boolean;
  isLoggedIn: boolean;
  userName: string | null | undefined;
  logOff: (val: boolean) => void;
  setLoggedStatus: Dispatch<SetStateAction<boolean>>;
}

const pages = [""];
const settings = ["Profile", "Dashboard", "Logout"];

export const Navbar: React.FC<INavbar> = ({
  navActive,
  isLoggedIn,
  userName,
  logOff,
  setLoggedStatus,
}) => {
  const { user, loginWithGoogle, logout, auth } = useAuthContext();
  userName = user?.displayName;
  // console.log ("user is =",user,"usernanme is =", userName, "displayname =",user?.displayName, "UID = ", user?.uid,  "🍒🍒🍒");
  // console.log("usecontext", navActive, useAuthContext())

  React.useEffect(() => {
    setLoggedStatus(true);
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
      console.log("inside logout if");
      logout(auth);
      logOff(false);
    }
  };

  return navActive == true ? (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/" style={{ textDecoration: "none", display: "flex" }}>
            <Mountain className={styles.logo} />
            <Typography
              sx={{
                color: "whitesmoke",
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
            sx={{ ml: 6, mr: "auto" }}
            variant="contained"
            href="/prefectures"
          >
            Explore by Map
          </Button>

          {user ? (
            <>
              <Typography
                sx={{ fontWeight: "600", display: { xs: "none", sm: "block" } }}
              >
                Welcome {userName?.split(" ")[0]}&nbsp;!
              </Typography>

              <Box sx={{ flexGrow: 0, ml: 1, mr: 1 }}>
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
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button variant="contained" onClick={() => loginWithGoogle()}>
              Log In
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  ) : (
    <></>
  );
};
