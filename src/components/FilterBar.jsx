import React from "react";
import {
  TextField,
  MenuItem,
  Paper,
  Button,
  Autocomplete,
} from "@mui/material";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "ScienceFiction",
  "TVMovie",
  "Thriller",
  "War",
  "Western",
];

const years = ["2025", "2024", "2023", "2022", "2021", "2020", "2019"];
const ratings = ["9+", "8+", "7+", "6+", "5+", "4+", "3+", "2+", "1+"];

export default function FilterBar({ onFilter }) {
  const [genre, setGenre] = React.useState("");
  const [year, setYear] = React.useState("");
  const [rating, setRating] = React.useState("");

  const handleFilter = () => {
    onFilter({ genre, year, rating });
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" }, // 👈 Stack on mobile
        gap: { xs: 2, sm: 2 },
        mt: 4,
        p: 2,
        justifyContent: "center",
        width: { xs: "90%", sm: "80%", md: "30%" },
        margin: "0 auto",
        alignItems: "center",
      }}
      elevation={3}
    >
      {/* Genre Dropdown */}
      <TextField
        select
        label="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        sx={{
          width: { xs: "100%", sm: 120 },
          "& .MuiInputBase-root": {
            height: 40,
          },
        }}
      >
        {genres.map((g) => (
          <MenuItem key={g} value={g}>
            {g}
          </MenuItem>
        ))}
      </TextField>

      {/* Year Selector with Typing Option */}
      <Autocomplete
        freeSolo
        options={years}
        value={year}
        onInputChange={(event, newInputValue) => setYear(newInputValue)}
        sx={{
          width: { xs: "100%", sm: 100 }, // 👈 Add this
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Year"
            sx={{
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
          />
        )}
      />

      {/* Rating Dropdown */}
      <TextField
        select
        label="Rating"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        sx={{
          width: { xs: "100%", sm: 120 },
          "& .MuiInputBase-root": {
            height: 40,
          },
        }}
      >
        {ratings.map((r) => (
          <MenuItem key={r} value={r}>
            {r}
          </MenuItem>
        ))}
      </TextField>

      {/* Filter Button */}
      <Button
        variant="contained"
        sx={{
          px: { xs: 1, sm: 3 },
          width: { xs: "100%", sm: 120 },
          "& .MuiInputBase-root": {
            height: 40,
          },
        }}
        onClick={handleFilter}
      >
        Find
      </Button>
    </Paper>
  );
}
