import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import LoginPage from "./pages/LoginPage";
import FavoritesPage from "./pages/FavoritesPage";
import { MovieProvider } from "./context/MovieContext";
import ThemeToggle from "./components/ThemeToggle";
import getTheme from "./theme";
import Navbar from "./components/Navbar";
import TrendingMoviesPage from "./pages/TrendingMoviesPage";
import PopularMoviesPage from "./pages/PopularMoviesPage";

// New wrapper component to access location
function AppContent({ darkMode, toggleTheme }) {
  const location = useLocation();

  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && (
        <Navbar darkMode={darkMode} toggleTheme={toggleTheme} />
      )}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/trending" element={<TrendingMoviesPage />} />
        <Route path="/popular" element={<PopularMoviesPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  const [darkMode, setDarkMode] = React.useState(false);
  const theme = React.useMemo(
    () => getTheme(darkMode ? "dark" : "light"),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MovieProvider>
        <Router>
          <AppContent
            darkMode={darkMode}
            toggleTheme={() => setDarkMode(!darkMode)}
          />
        </Router>
      </MovieProvider>
    </ThemeProvider>
  );
}
