import React, { useEffect, useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { fetchTrendingMovies } from "../services/api";
import SpotlightSection from "../components/SpotlightSection";
import SlideshowSection from "../components/SlideshowSection";

export default function TrendingMoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(2);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        const trending = await fetchTrendingMovies();
        setMovies(trending.slice(0, 20));
      } catch (err) {
        console.error("Failed to fetch trending movies:", err);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  const getVisibleMovies = () => {
    if (movies.length < 5) return movies;
    return movies.slice(focusedIndex - 2, focusedIndex + 3);
  };

  // Get the backdrop image URL for the focused movie
  const focusedMovie = movies[focusedIndex];
  const backgroundImage = focusedMovie
    ? `url(https://image.tmdb.org/t/p/original${focusedMovie.backdrop_path})`
    : null;

  return (
    <Box
      sx={{
        pt: 10,
        position: "relative",
        height: "100vh",
        maxWidth: "100%",
        overflow: "hidden",
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 0.5s ease-in-out",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "inherit",
          filter: "blur(1px)",
        },
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          textAlign: "center",
          display: { xs: "block", sm: "none" },
          zIndex: 20,
          position: "relative", 
          width: "100%", 
          py: 2, 
        }}
      >
        🔥 Trending Movies
      </Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <SpotlightSection focusedMovie={focusedMovie} />
          <SlideshowSection
            movies={movies}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
            getVisibleMovies={getVisibleMovies}
          />
        </>
      )}
    </Box>
  );
}
