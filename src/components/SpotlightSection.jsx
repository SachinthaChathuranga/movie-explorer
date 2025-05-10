import React from "react";
import { Box, Typography, Button, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SpotlightSection = ({ focusedMovie }) => {
  const navigate = useNavigate();

  if (!focusedMovie) return null;

  return (
    <Box
      sx={{
        mb: 4,
        p: 2,
        borderRadius: 2,
        bgcolor: "background.paper",
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        boxShadow: 3,
        maxWidth: { xs: 400, sm: 600 },
        ml: { xs: 2, sm: 8, md: 30 },
        backdropFilter: "blur(5px)",
        WebkitBackdropFilter: "blur(5px)",
      }}
    >
      <Typography variant="h5" gutterBottom>
        {focusedMovie?.title}
      </Typography>
      <Typography variant="body2" gutterBottom>
        {focusedMovie?.overview || "No description available."}
      </Typography>
      <Typography variant="caption" display="block">
        ⭐ {focusedMovie?.vote_average} | {focusedMovie?.release_date?.slice(0, 4)}
      </Typography>
      <Tooltip title="Explore more">
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={() => navigate(`/movie/${focusedMovie?.id}`)}
      >
        Visit
      </Button>
    </Tooltip>
    </Box>
  );
};

export default SpotlightSection;
