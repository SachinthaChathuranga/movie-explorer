import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        gap: 1.5,
        p: 1,
        borderRadius: 10,
        width: { xs: "95%", sm: "80%", md: "30%" },
        margin: "0 auto",
        alignItems: "center",
      }}
      elevation={3}
    >
      <TextField
        fullWidth
        label="Search..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          "& .MuiInputBase-root": {
            height: 40,
            borderRadius: 20,
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          minWidth: 48,
          height: 40,
          borderRadius: 20,
        }}
      >
        <SearchIcon />
      </Button>
    </Paper>
  );
}
