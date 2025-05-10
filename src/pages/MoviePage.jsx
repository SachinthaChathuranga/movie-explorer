import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Rating,
  Chip,
  Divider,
  Tooltip,
  Stack,
  useMediaQuery,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { fetchMovieDetails } from "../services/api";
import { useTheme } from "@mui/material/styles";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useMovieContext } from "../context/MovieContext";

export default function MoviePage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const { favorites, toggleFavorite } = useMovieContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const loadDetails = async () => {
      const data = await fetchMovieDetails(id);
      setMovie(data);

      // Get trailer (look for "YouTube" trailer type)
      const trailer = data.videos?.results.find(
        (v) => v.site === "YouTube" && v.type === "Trailer"
      );
      setTrailerKey(trailer?.key || null);
    };
    loadDetails();
  }, [id]);

  // const toggleFavorite = () => setFavorite((prev) => !prev);
  const backgroundImage = movie
    ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
    : null;

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        backgroundImage: backgroundImage,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0,0,0, 0.6)"
              : "rgba(255,255,255, 0.6)",
          backdropFilter: "blur(2px)",
          zIndex: 0,
        },
      }}
    >
      <Container sx={{ position: "relative", zIndex: 1, py: 4, pt: 10 }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: "1.8rem", // small screens
                sm: "2.4rem",
                md: "3rem", // medium and up
                lg: "3.5rem", // optional
              },
              fontWeight: "bold",
              mb: 2,
              textTransform: "uppercase",
              letterSpacing: "2px",
            }}
          >
            {movie.title + "(" + movie.release_date?.slice(0, 4) + ")"}
          </Typography>

          {/* Favorite Button */}
          <Tooltip
            title={
              favorites.some((fav) => fav.id === movie.id)
                ? "Remove from Favorites"
                : "Add to Favorites"
            }
            arrow
          >
            <IconButton
              color={
                favorites.some((fav) => fav.id === movie.id)
                  ? "error"
                  : "default"
              }
              onClick={() => toggleFavorite(movie)}
            >
              {favorites.some((fav) => fav.id === movie.id) ? (
                <FavoriteIcon sx={{ fontSize: 40 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 40 }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: { xs: "block", md: "flex" },
            alignItems: "flex-start",
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" }, // center on mobile, left on desktop
            }}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              style={{ maxWidth: 200, borderRadius: 10 }}
            />
          </Box>
          <Box
            sx={{
              flex: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: "background.paper",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: 3,
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
              mt: { xs: 2, md: 0 },
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Overview
            </Typography>
            <Typography variant="body1" mt={2}>
              {movie.overview}
            </Typography>
            <Divider sx={{ my: 1 }} />
            {/* Genres Section */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Genres
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                {movie.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    sx={{
                      backgroundColor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Divider sx={{ my: 1 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
              Rating
            </Typography>
            <Box display="flex" sx={{ alignItems: "center" }}>
              <Rating
                name="text-feedback"
                value={movie.vote_average ? movie.vote_average / 2 : 0}
                readOnly
                precision={0.5}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
                {movie.vote_average?.toFixed(1)}/10
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              flex: 1,
              mt: { xs: 2, sm: 0, md: 0 },
              p: 2,
              borderRadius: 2,
              bgcolor: "background.paper",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              boxShadow: 3,
              backdropFilter: "blur(3px)",
              WebkitBackdropFilter: "blur(3px)",
            }}
          >
            <Typography variant="subtitle1">
              <strong>Release Date:</strong> {movie.release_date}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Status:</strong> {movie.status}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Language:</strong> {movie.original_language}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Budget:</strong> {movie.budget?`$${movie.budget.toLocaleString()}` : "NA"}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Revenue:</strong> {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "NA"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 4, border: 1 }} />

        {/* Trailer Section */}
        {trailerKey && (
          <Box mt={5}>
            <Typography variant="h5" gutterBottom>
              Trailer
            </Typography>
            <Box
              sx={{
                position: "relative",
                paddingTop: "56.25%", // 16:9 ratio
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="YouTube Trailer"
                allowFullScreen
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                }}
              />
            </Box>
          </Box>
        )}

        <Divider sx={{ my: 4, border: 1 }} />

        {/* Top Cast Section */}
        {movie.credits?.cast?.length > 0 && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Top Billed Cast
            </Typography>
            <Box>
              <Grid container spacing={2}>
                {movie.credits.cast.slice(0, 6).map((actor) => (
                  <Grid item xs={6} sm={4} md={2} key={actor.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="240"
                        image={
                          actor.profile_path
                            ? `https://image.tmdb.org/t/p/w300${actor.profile_path}`
                            : "https://via.placeholder.com/300x450?text=No+Image"
                        }
                        alt={actor.name}
                      />
                      <CardContent>
                        <Typography variant="subtitle2" noWrap>
                          {actor.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          noWrap
                        >
                          as {actor.character}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
