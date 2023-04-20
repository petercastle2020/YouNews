import { useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import SearchBox from "./SearchBox";

// MUI
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// MUI Switch imp
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// useTheme
import { useTheme } from "@mui/material/styles";

// Theme Switch
const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
    width: 32,
    height: 32,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
    borderRadius: 20 / 2,
  },
}));

function ResponsiveAppBar({ toggleTheme }) {
  const theme = useTheme();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const appBarStyle = {
    backgroundColor: theme.palette.mode === "dark" ? "#212121" : "#00bcd4",
  };

  const handleThemeChange = () => {
    toggleTheme();
  };

  // Auth
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const [avatarUrl, setAvatarUrl] = React.useState("");
  const [userHandle, setUserHandle] = React.useState("");

  useEffect(() => {
    if (user) {
      setAvatarUrl(user.avatar);
      setUserHandle(user.handle);
    }
  }, [user]);

  const handleLogoutClick = () => {
    logout();
  };

  const settings = [
    { name: "Profile", link: "/my" },
    { name: "Write Article", link: "/new-article" },
    { name: "Account", link: "/account" },
    { name: "Logout", link: "/logout", onClick: handleLogoutClick },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={appBarStyle}>
      <Container maxWidth="xl" disableGutters>
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              ml: 2,
              display: { xs: "inline-block", md: "flex" },
              fontFamily: "Verdana, 'Source Sans Pro', sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              paddingLeft: "0.3rem",
              "&:hover": {
                color: "#00a9e0",
                transition: "color 0.3s easy-in-out",
              },
            }}
          >
            You News
          </Typography>
          <SearchBox />
          {user && (
            <>
              <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                <Container
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      mr: 1,
                      display: { xs: "none", sm: "flex", md: "flex" },
                      fontFamily: "Verdana, 'Source Sans Pro', sans-serif",
                      fontWeight: 300,
                      fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.8rem" },
                      color: "inherit",
                      whiteSpace: "nowrap",
                      textDecoration: "none",
                    }}
                  >
                    <RouterLink className="nav-link" to="/my">
                      {userHandle}
                    </RouterLink>
                  </Typography>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="user-avatar"
                          src={avatarUrl ? avatarUrl : ""}
                        />
                      </IconButton>
                    </Tooltip>
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
                      {settings.map((setting, index) => (
                        <MenuItem
                          sx={{ padding: 0, margin: 0 }}
                          key={setting.name}
                          onClick={handleCloseUserMenu}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              width: "100%",
                              alignItems: "center",
                            }}
                          >
                            <RouterLink
                              className="settings-links"
                              to={setting.link}
                              onClick={
                                index === settings.length - 1
                                  ? handleLogoutClick
                                  : null
                              }
                              style={{
                                display: "flex",
                                width: "100%",
                                justifyContent: "center",
                                padding: "0.5rem",
                                textDecoration: "none",
                              }}
                            >
                              {setting.name}
                            </RouterLink>
                          </Box>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                </Container>
              </Box>
            </>
          )}

          {!user && (
            <Box sx={{ flexGrow: 0, marginLeft: "auto", display: "flex" }}>
              <RouterLink className="nav-link" to="/signup">
                SignUp
              </RouterLink>
              <RouterLink className="nav-link" to="/login">
                Login
              </RouterLink>
            </Box>
          )}
          <FormGroup>
            <FormControlLabel
              sx={{ mr: 0 }}
              control={
                <MaterialUISwitch
                  sx={{ m: 1 }}
                  onChange={handleThemeChange}
                  defaultChecked
                />
              }
              // label="MUI switch"
            />
          </FormGroup>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
