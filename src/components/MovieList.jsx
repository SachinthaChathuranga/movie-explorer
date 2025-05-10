import React from 'react';
import { Grid } from '@mui/material';
import MovieCard from './MovieCard';

export default function MovieList({ movies }) {
  return (
    <Grid container spacing={2}>
      {movies.map((movie) => (
        <Grid item key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}
