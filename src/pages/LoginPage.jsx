import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography } from "@mui/material";
import { fetchTrendingMovies } from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [backdrops, setBackdrops] = useState([]);

  useEffect(() => {
    const loadBackdrops = async () => {
      try {
        const movies = await fetchTrendingMovies();
        const urls = movies
          .slice(0, 12)
          .map((m) => `https://image.tmdb.org/t/p/original${m.backdrop_path}`);
        setBackdrops(urls);
      } catch (error) {
        console.error("Failed to load backdrops:", error);
      }
    };
    loadBackdrops();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Repeating backdrop images */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 0,
          position: "fixed",
          width: "100%",
          height: "100%",
          zIndex: -2,
        }}
      >
        {backdrops.map((url, index) => (
          <Box
            key={index}
            sx={{
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              height: "50vh",
            }}
          />
        ))}
      </Box>

      {/* Blur overlay */}
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backdropFilter: "blur(4px)",
          zIndex: -2,
        }}
      />

      <Box
        sx={{
          minHeight: "100vh",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          p={4}
          borderRadius={2}
          bgcolor="rgba(255,255,255,0.8)"
          boxShadow={10}
        >
          <Typography
            variant="h4"
            gutterBottom
            color="primary"
            sx={{ fontWeight: "bold" }}
          >
            Login
          </Typography>
          <Box component="form" onSubmit={handleLogin} width={300}>
            <TextField fullWidth label="Username" margin="normal" required />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 5, borderRadius: 3 }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
