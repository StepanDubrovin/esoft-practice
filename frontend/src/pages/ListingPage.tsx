import React from "react";
import {
  Box
} from "@mui/material";
import { useListings } from "../hooks/useListings";
import ListingCard from "../components/ListingCard";
import { IListingCard } from "../interfaces/IListingCard";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/hooks";
import { getAllUsers } from "../store/userSlice";
import ListingFilters from "../components/ListingFilters";
import { useState } from "react";
import { IListingFilters } from "../interfaces/IListingFilters";

const ListingsPage: React.FC = () => {

  const [filters, setFilters] = useState<IListingFilters>();

  const dispatch = useAppDispatch();

  const { listings }: { listings: IListingCard[] } = useListings(filters);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
   <Box sx={{ display: 'flex', maxWidth: 1200, mx: 'auto', width: '100%', mt: 5 }}>
      <ListingFilters onApply={setFilters}/>

      <Box sx={{ flex: 1, p: 2 }}>
        {listings.map((item) => (
          <ListingCard key={item.id} {...item} />
        ))}

      </Box>  
    </Box>
  );
};

export default ListingsPage;
