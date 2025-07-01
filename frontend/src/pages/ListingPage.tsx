import React, { useState } from "react";
import {
  Container,
  TextField,
  MenuItem,
  CircularProgress,
  Typography,
  Box
} from "@mui/material";
import { useListings } from "../hooks/useListings";
import ListingCard from "../components/ListingCard";

const ListingsPage: React.FC = () => {
  const [city, setCity] = useState<string>("");

  const { listings, loading, error } = useListings({
    city: city || undefined, // передаём undefined если пусто
  });

  return (
    <Container sx={{ mt: 4 }}>
      <Box mb={3}>
        <TextField
          label="Фильтр по городу"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          fullWidth
          select
        >
          <MenuItem value="">Все города</MenuItem>
          <MenuItem value="Краснодар">Краснодар</MenuItem>
          <MenuItem value="Москва">Москва</MenuItem>
          <MenuItem value="Сочи">Сочи</MenuItem>
        </TextField>
      </Box>

      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}

      {listings.map((listing) => (
        <ListingCard key={listing.id} {...listing} />
      ))}
    </Container>
  );
};

export default ListingsPage;
