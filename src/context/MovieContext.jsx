import React, { createContext, useContext, useState, useEffect } from "react";

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  // const [latestMovies, setLatestMovies] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  // Persist favorites in localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add movie to favorites
  const addFavorite = (movie) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.find((fav) => fav.id === movie.id)) {
        return [...prevFavorites, movie];
      }
      return prevFavorites;
    });
  };

  // Remove movie from favorites
  const removeFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((movie) => movie.id !== movieId)
    );
  };

  // Toggle favorite status of a movie
  const toggleFavorite = (movie) => {
    if (favorites.find((fav) => fav.id === movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        popularMovies,
        setPopularMovies,
        favorites,
        setFavorites,
        toggleFavorite,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => useContext(MovieContext);
