import React, { useEffect, useState } from "react";
import { Box, Typography,  } from "@mui/material";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import {
  fetchTrendingMovies,
  searchMovies,
  filterMovies,
  fetchPopularMovies,
  // fetchLatestMovies
} from "../services/api";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import MovieGrid from "../components/MovieGrid";

export default function HomePage() {
  const { movies, setMovies } = useMovieContext();
  const { popularMovies, setPopularMovies } = useMovieContext();
  // const {latestMovies, setLatestMovies} = useMovieContext();
  const [bannerImage, setBannerImage] = useState("");
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [filterParams, setFilterParams] = useState(null);
const [filterPage, setFilterPage] = useState(1);
const [filterHasMore, setFilterHasMore] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      const trending = await fetchTrendingMovies();
      const popular = await fetchPopularMovies();
      // const latest = await fetchLatestMovies();
      setMovies(trending);
      setPopularMovies(popular);
      if (trending[0]?.poster_path) {
        setBannerImage(
          `https://image.tmdb.org/t/p/original${trending[0].poster_path}`
        );
      }
    };
    loadMovies();
  }, [setMovies, setPopularMovies]);

  // Handle Search Submit
  const handleSearch = async (query) => {
    if (!query) {
      setIsFiltered(false);
      setSearchQuery("");
      setPage(1);
      return;
    }
    const results = await searchMovies(query, 1);
    setMovies(results);
    setSearchQuery(query);
    setPage(2); // next page to load
    setHasMore(results.length > 0); 
    setIsFiltered(true);
  };

  const loadMoreResults = async () => {
    const nextPageResults = await searchMovies(searchQuery, page);
    setMovies((prev) => [...prev, ...nextPageResults]);
    setPage((prev) => prev + 1);
    setHasMore(nextPageResults.length > 0);
  };

  // Handle Filter Submit
  const handleFilter = async (filters) => {
    const { genre, year, rating } = filters;
    if (!genre && !year && !rating) {
      setIsFiltered(false);
      return;
    }
  
    const results = await filterMovies(filters, 1); // start from page 1
    setMovies(results);
    setFilterParams(filters);
    setFilterPage(2); // next page to fetch
    setFilterHasMore(results.length > 0);
    setIsFiltered(true);
  };

  const loadMoreFilteredResults = async () => {
    if (!filterParams) return;
    const moreResults = await filterMovies(filterParams, filterPage);
    setMovies((prev) => [...prev, ...moreResults]);
    setFilterPage((prev) => prev + 1);
    setFilterHasMore(moreResults.length > 0);
  };
  

  return (
    <Box sx={{ p: 2, mt: 8 }}>
      {/* Banner */}
      {/* Banner with blurred background queue */}
      <Box
        sx={{
          position: "relative",
          height: 400,
          borderRadius: 2,
          overflow: "hidden",
          mb: 3,
        }}
      >
        {/* Background image layer */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${bannerImage})`,
            backgroundSize: "center",
            backgroundPosition: "center",
            filter: "blur(2px)",
            transform: "scale(1.1)",
          }}
        />

        {/* Foreground content (text + inputs) */}
        <Box
          sx={{
            position: "relative",
            zIndex: 1,
            color: "#fff",
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h5">WELCOME</Typography>
          <Typography variant="h3" fontWeight="bold">
            Movie Explorer
          </Typography>
          <Typography variant="h6" mt={1}>
            Discover Your Favorite Films
          </Typography>

          <Box mt={4}>
            <SearchBar onSearch={handleSearch} />
          </Box>

          <Box mt={2}>
            <FilterBar onFilter={handleFilter} />
          </Box>
        </Box>
      </Box>

      {/* Results Section */}
      <Box mt={4}>
        {isFiltered ? (
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "60%",
              },
              mx: "auto",
            }}
          >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Results
            </Typography>
            <Box
              sx={{
                display: "flex",
                overflowX: "auto",
                justifyContent: 'space-evenly',
                gap: 2,
                pb: 2,
                scrollSnapType: "x mandatory",
                "&::-webkit-scrollbar": { display: "none" },
                maxWidth: 6 * 150 + 5 * 16,
              }}
              flexWrap="wrap"
            >
              {movies.length > 0 ? (
                movies.map((movie, index) => (
                  <MovieCard
                    key={`${movie.id}-${index}`}
                    movie={movie}
                    index={index}
                  />
                ))
              ) : (
                <Typography>No results found.</Typography>
              )}
            </Box>
            {(hasMore || filterHasMore) && (
              <Box mt={2} textAlign="center">
                <button
                  onClick={isFiltered && filterParams ? loadMoreFilteredResults : loadMoreResults}
                  style={{
                    padding: "10px 20px",
                    fontSize: "1rem",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Load More
                </button>
              </Box>
            )}
          </Box>
        ) : (
          <>
            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "60%",
                },
                mx: "auto",
              }}
            >
              <MovieGrid
                title="Trending Movies"
                movies={movies}
                navLink="/trending"
              />
            </Box>

            <Box
              sx={{
                width: {
                  xs: "100%",
                  md: "60%",
                },
                mx: "auto",
              }}
            >
              <MovieGrid
                title="Popular Movies"
                movies={popularMovies}
                navLink="/popular"
              />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
