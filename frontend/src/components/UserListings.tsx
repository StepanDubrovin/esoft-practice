import React, { useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import { useListings } from "../hooks/useListings";
import { IListing } from "../interfaces/IListing";
import { Box, IconButton, Typography } from "@mui/material";
import ListingCard from "./ListingCard";
import ListingService from "../services/listing.service";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import EditListingModal from "./EditListing";

const UserListings: React.FC = () => {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const { listings, setListings } = useListings();

  const [editOpen, setEditOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<IListing | null>(null);

  const userListings = listings.filter(
    (listing: IListing) => listing.creatorId === currentUser?.id
  );

  const handleDelete = async (id: string) => {
    try {
      await ListingService.deleteListing(id);
      setListings((prev: IListing[]) => prev.filter((l) => l.id !== id));
    } catch (err) {
      console.error("Ошибка при удалении", err);
    }
  };

  const handleEdit = (listing: IListing) => {
    setSelectedListing(listing);
    setEditOpen(true);
  };

  const handleCloseEdit = () => {
    setEditOpen(false);
    setSelectedListing(null);
  };

  return (
    <Box sx={{ ml: 4 }}>
      <Typography variant="h5" gutterBottom sx={{ ml: "20px" }}>
        Мои объявления
      </Typography>

      {userListings.map((listing) => (
        <Box key={listing.id} sx={{ position: "relative", mb: 2 }}>
          <ListingCard {...listing} author={currentUser} />
    

          <IconButton
            onClick={() => handleEdit(listing)}
            sx={{
              position: "absolute",
              right: 670,
              top: 10,
            }}
          >
            <EditIcon   />
          </IconButton>

          <IconButton
            onClick={() => handleDelete(listing.id)}
            sx={{
              position: "absolute",
              right: 710,
              top: 10,
            }}
          >
            <DeleteIcon sx={{
              color: '#d40303'
            }} />
          </IconButton>
        </Box>
      ))}

      {selectedListing && (
        <EditListingModal
          open={editOpen}
          onClose={handleCloseEdit}
          listing={selectedListing}
          setListings={setListings}
        />
      )}
    </Box>
  );
};

export default UserListings;
