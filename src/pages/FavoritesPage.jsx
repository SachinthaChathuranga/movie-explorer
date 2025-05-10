import React from "react";
import { Grid, Typography, Container, Box } from "@mui/material";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";

export default function FavoritesPage() {
  const { favorites } = useMovieContext();

  return (
    <Box
      sx={{
        width: {
          xs: "100%",
          md: "60%",
        },
        mx: "auto",
        
        // bgcolor: 'red'
      }}
    >
      <Typography variant="h4" my={3} sx={{fontWeight:'bold', pt:8}}>
        Your Favorites
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 2,
          justifyContent: "space-evenly",
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
          maxWidth: 6 * 150 + 5 * 16,
        }}
        flexWrap="wrap"
      >
        {favorites.length > 0 ? (
          favorites.map((movie, index) => (
            <MovieCard
              key={`${movie.id}-${index}`}
              movie={movie}
              index={index}
            />
          ))
        ) : (
          <Typography>No favorite movies yet.</Typography>
        )}
      </Box>
    </Box>
  );
}
