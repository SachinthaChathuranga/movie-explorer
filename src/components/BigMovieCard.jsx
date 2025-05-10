import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Chip,
  Avatar,
  Box,
  Typography,
} from "@mui/material";
import { Link } from 'react-router-dom';

export default function BigMovieCard({ movie, index, isFocused }) {
  return (
    <Box
      sx={{
        width: 200,
        flex: "0 0 auto",
        scrollSnapAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: 'transform 0.3s',
        transform: isFocused ? 'scale(1.2)' : 'scale(1)',
        zIndex: isFocused ? 10 : 1,
      }}
    >
      <Card
        component={Link}
        to={`/movie/${movie.id}`}
        sx={{
          width: 180,
          borderRadius: 3,
          position: "relative",
          textDecoration: "none",
          color: "inherit",
          boxShadow: 5,
          transition: 'box-shadow 0.3s',
        }}
      >
        <CardMedia
          component="img"
          height="250"
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
            avatar={<Avatar sx={{ width: 18, height: 18, fontSize: 12 }}>⭐</Avatar>}
            label={`${Math.round(movie.vote_average)}/10`}
            color="warning"
            size="small"
          />
        </Box>

        <CardContent>
          <Typography
            variant="subtitle1"
            noWrap
            sx={{ textAlign: "center" }}
          >
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
