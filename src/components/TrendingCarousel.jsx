import React, { useRef } from "react";
import { useNavigate } from "react-router-dom"; // Add this at the top
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  IconButton,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function TrendingCarousel({ movies }) {
  const navigate = useNavigate();

  const goToTrending = () => {
    navigate("/trending");
  };

  const scrollRef = useRef(null);

  const scrollNext = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <Box sx={{ mt: 4, position: "relative" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Trending
      </Typography>

      {/* Scrollable Movie Cards */}
      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 2,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" }, 
        }}
      >
        {movies.map((movie) => (
          <Card
            key={movie.id}
            sx={{
              minWidth: 150,
              maxWidth: 150,
              flex: "0 0 auto",
              scrollSnapAlign: "start",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <CardMedia
              component="img"
              height="220"
              image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
            <Box sx={{ position: "absolute", top: 8, left: 8 }}>
              <Chip
                label={movie.release_date?.slice(0, 4)}
                color="success"
                size="small"
              />
            </Box>
            <Box sx={{ position: "absolute", top: 8, right: 8 }}>
              <Chip
                label={`${Math.round(movie.vote_average)}/10`}
                color="warning"
                size="small"
              />
            </Box>
            <CardContent>
              <Typography variant="subtitle2" noWrap>
                {movie.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Next Arrow Button */}
      <IconButton
        onClick={goToTrending}
        sx={{
          position: "absolute",
          top: "40%",
          right: -10,
          backgroundColor: "white",
          boxShadow: 2,
          zIndex: 1,
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}
