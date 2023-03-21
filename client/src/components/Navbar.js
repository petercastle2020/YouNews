import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

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

function ResponsiveAppBar() {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Auth
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleLogoutClick = () => {
    logout();
  };

  // const settings = ["Profile", "Account", "Logout"];
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
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Source Sans Pro, sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
              paddingLeft: "0.3rem",
            }}
          >
            You News
          </Typography>
          {user && (
            <>
              <Box sx={{ flexGrow: 0, marginLeft: "auto" }}>
                <Container sx={{ display: "flex", alignItems: "baseline" }}>
                  <Typography
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex" },
                      fontFamily: "Source Sans Pro, sans-serif",
                      fontWeight: 700,
                      // letterSpacing: ".3rem",
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <Link className="nav-link" to="/my">
                      {user.email}
                    </Link>
                  </Typography>

                  <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="" />
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
                          key={setting}
                          onClick={handleCloseUserMenu}
                        >
                          <Box sx={{ width: "100%" }}>
                            <Link
                              to={setting.link}
                              onClick={
                                index === settings.length - 1
                                  ? handleLogoutClick
                                  : null
                              }
                              style={{
                                display: "block",
                                width: "100%",
                                textDecoration: "none",
                              }}
                            >
                              <Typography
                                textAlign="center"
                                sx={{ padding: "0.5rem 1rem 0.5rem 1rem" }}
                              >
                                {setting.name}
                              </Typography>
                            </Link>
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
              <Link className="nav-link" to="/signup">
                SignUp
              </Link>
              <Link className="nav-link" to="/login">
                Login
              </Link>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
