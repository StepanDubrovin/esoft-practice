import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { useListings } from "../hooks/useListings";
import { IListing } from "../interfaces/IListing";
import { Box } from "@mui/material";
import ListingCard from "./ListingCard";

const UserListings: React.FC = () => {
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const { listings } = useListings();

    const userListings = listings.filter(
        (listing: IListing) => listing.creatorId === currentUser?.id
    );

    return (
         <Box sx={{ ml: 4 }}>
            {userListings.map((listing) => (
                <ListingCard
                    key={listing.id}
                    {...listing}
                    author={currentUser} 
                />
            ))}
        </Box>
    );
};

export default UserListings;