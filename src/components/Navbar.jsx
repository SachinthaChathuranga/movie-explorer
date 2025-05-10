import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link, useLocation } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

export default function Navbar({ darkMode, toggleTheme }) {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const navItems = [
    { label: "Home", path: "/home" },
    { label: "Trending", path: "/trending" },
    { label: "Popular", path: "/popular" },
    { label: "Favorite", path: "/favorites" },
  ];

  const drawer = (
    <Box
      sx={{
        width: 250,
        height: "100%",
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
      onClick={() => setDrawerOpen(false)}
    >
      <List sx={{mt:5, ml:2}}>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              "&.Mui-selected": {
                backgroundColor: theme.palette.action.selected,
                color: theme.palette.primary.main,
              },
              "&:hover": {
                backgroundColor: theme.palette.action.hover,
                color: theme.palette.primary.main,
              },
              color: theme.palette.text.primary,
            }}
          >
            <ListItemText
              primary={item.label}
              primaryTypographyProps={{ sx: { fontWeight: 500 } }}
            />
          </ListItem>
        ))}
        <ListItem
          button
          component={Link}
          to="/"
          sx={{
            "&:hover": {
              backgroundColor: theme.palette.action.hover,
              color: theme.palette.primary.main,
            },
            color: theme.palette.text.primary,
          }}
        >
          <ListItemText
            primary="Login"
            primaryTypographyProps={{ sx: { fontWeight: 500 } }}
          />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="default" elevation={2}>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Typography
            variant="h6"
            component={Link}
            to="/home"
            sx={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            Movie Explorer
          </Typography>

          {isMobile ? (
            <>
              {/* Mobile Menu */}
              <Box>
                <IconButton onClick={toggleTheme} color="inherit">
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <IconButton
                  edge="end"
                  color="inherit"
                  onClick={() => setDrawerOpen(true)}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </>
          ) : (
            <>
              {/* Desktop Navigation */}
              <Box sx={{ display: "flex", gap: 2 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    variant={
                      location.pathname === item.path ? "outlined" : "text"
                    }
                    sx={{ color: "inherit" }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <IconButton onClick={toggleTheme} color="inherit">
                  {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Typography variant="body2">
                  {darkMode ? "Light" : "Dark"}
                </Typography>
                <Tooltip title="User">
                  <IconButton component={Link} to="/" color="inherit">
                    <PersonIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for Mobile */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        {drawer}
      </Drawer>
    </>
  );
}
