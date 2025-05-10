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

export default function MovieCard({ movie, index }) {
  return (
    <Card
      key={`${movie.id}-${index}`}
      sx={{
        minWidth: 150,
        maxWidth: 150,
        flex: "0 0 auto",
        scrollSnapAlign: "start",
        borderRadius: 2,
        position: "relative",
        textDecoration: "none",       
        color: "inherit", 
        boxShadow:5,
      }}
      component={Link} to={`/movie/${movie.id}`}
    >
      <CardMedia
        component="img"
        height="220"
        image={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <Box sx={{ position: "absolute", top: 0, left: 0 }}>
        <Chip
          label={movie.release_date?.slice(0, 4)}
          color="success"
          size="small"
        />
      </Box>
      <Box sx={{ position: "absolute", top: 0, right: 0 }}>
        <Chip
          avatar={<Avatar>⭐</Avatar>}
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
  );
}
