import axios from 'axios';

const API_KEY = 'bfaafbfa6590b08bca4a9d42fe75f580';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
    const res = await axios.get(`${BASE_URL}/trending/movie/week?api_key=${API_KEY}`);
    return res.data.results;
  };
  
  export const fetchPopularMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    return res.data.results;
  };
  
  export const searchMovies = async (query, page = 1) => {
    const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);
    return res.data.results;
  };
  
  export const fetchMovieDetails = async (id) => {
    const res = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);
    return res.data;
  };
  
  // Genre name to TMDb genre ID mapping
  const genreMap = {
    Action: 28,
    Adventure: 12,
    Animation: 16,
    Comedy: 35,
    Crime: 80,
    Documentary: 99,
    Drama: 18,
    Family: 10751,
    Fantasy: 14,
    History: 36,
    Horror: 27,
    Music: 10402,
    Mystery: 9648,
    Romance: 10749,
    ScienceFiction: 878,
    TVMovie: 10770,
    Thriller: 53,
    War: 10752,
    Western: 37,
  };
  
  
  export const filterMovies = async ({ genre, year, rating }, page = 1) => {
    const params = {
      api_key: API_KEY,
      with_genres: genreMap[genre],
      primary_release_year: year,
      'vote_average.gte': rating ? parseFloat(rating) : undefined,
      sort_by: 'popularity.desc',
      page,
    };
  
    Object.keys(params).forEach((key) => params[key] === undefined && delete params[key]);
  
    const res = await axios.get(`${BASE_URL}/discover/movie`, { params });
    return res.data.results;
  };
  