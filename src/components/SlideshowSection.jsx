import React, { useEffect, useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BigMovieCard from "../components/BigMovieCard";

const SlideshowSection = ({
  movies,
  focusedIndex,
  setFocusedIndex,
  getVisibleMovies,
}) => {
  const [hovering, setHovering] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (hovering || movies.length === 0) return;

    intervalRef.current = setInterval(() => {
      setFocusedIndex((prev) => {
        const next = prev + 1;
        return next >= movies.length - 2 ? 2 : next;
      });
    }, 4000);

    return () => clearInterval(intervalRef.current);
  }, [hovering, movies, setFocusedIndex]);

  const handleNext = () => {
    setFocusedIndex((prev) => Math.min(prev + 1, movies.length - 3));
  };

  const handlePrev = () => {
    setFocusedIndex((prev) => Math.max(prev - 1, 2));
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 25,
        left: 0,
        right: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "space-between", md: "center" }, 
        py: 2,
        zIndex: 5,
        px: { xs: 1, sm: 2 },
        overflowX: "visible", 
      }}
    >
      {/* Left Arrow Button */}
      <IconButton
        onClick={handlePrev}
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 3,
          zIndex: 10,
          width: { xs: 40, sm: 50 },
          height: { xs: 40, sm: 50 },
          display: { xs: "flex", sm: "flex" },
        }}
        disabled={focusedIndex <= 2}
      >
        <ArrowBackIosNewIcon />
      </IconButton>

      <Box
        sx={{
          display: "flex",
          gap: 2,
          width: "100%",
          maxWidth: 1200,
          justifyContent: "center",
        }}
      >
        {getVisibleMovies().map((movie, idx) => {
          const isFocused = idx === 2;
          return (
            <BigMovieCard
              key={movie.id}
              movie={movie}
              index={idx}
              isFocused={isFocused}
            />
          );
        })}
      </Box>

      {/* Right Arrow Button */}
      <IconButton
        onClick={handleNext}
        sx={{
          backgroundColor: "background.paper",
          boxShadow: 3,
          zIndex: 10,
          width: { xs: 40, sm: 50 },
          height: { xs: 40, sm: 50 },
          display: { xs: "flex", sm: "flex" },
          position: { xs: "fixed", sm: "relative" }, 
          right: { xs: 10, sm: 0 },
        }}
        disabled={focusedIndex >= movies.length - 3}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default SlideshowSection;
