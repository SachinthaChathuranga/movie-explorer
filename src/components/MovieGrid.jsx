import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, IconButton, Tooltip } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from "@mui/material/styles";
import MovieCard from "./MovieCard";

export default function MovieGrid({ title, movies, navLink }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const isHovering = useRef(false);
  const theme = useTheme();

  const goToTrending = () => {
    navigate(navLink);
  };

  const movieList = [...movies, ...movies]; // Duplicate list for looping

  useEffect(() => {
    const container = scrollRef.current;
    const cardWidth = 150 + 16; // card + gap

    const interval = setInterval(() => {
      if (!isHovering.current && container) {
        // Scroll right
        container.scrollBy({ left: cardWidth, behavior: "smooth" });

        // If reached end of first half, reset
        if (container.scrollLeft >= cardWidth * movies.length) {
          setTimeout(() => {
            container.scrollLeft = 0;
          }, 400); // Wait for smooth scroll to finish
        }
      }
    }, 2000); // every 2s

    return () => clearInterval(interval);
  }, [movies]);

  return (
    <Box sx={{ mt: 4, position: "relative" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>

      <Box
        ref={scrollRef}
        onMouseEnter={() => (isHovering.current = true)}
        onMouseLeave={() => (isHovering.current = false)}
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          pb: 2,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { display: "none" },
          maxWidth: 6 * 150 + 5 * 16,
        }}
      >
        {movieList.map((movie, index) => (
          <MovieCard key={`${movie.id}-${index}`} movie={movie} index={index} />
        ))}
      </Box>
      <Tooltip title={`Go to ${title}`}>
        <IconButton
          onClick={goToTrending}
          sx={{
            position: "absolute",
            top: "40%",
            right: -10,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: 2,
            zIndex: 1,
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark"
                  ? theme.palette.grey[800]
                  : theme.palette.grey[200],
            },
          }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
