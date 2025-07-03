import React from "react";
import { useAppSelector } from "../hooks/hooks";
import { useListings } from "../hooks/useListings";
import { IListing } from "../interfaces/IListing";
import { CardContent, Typography, Box } from "@mui/material";
import { typeMap, statusMap } from "../constants/listingsMap";

const UserListings: React.FC = () => {
    const currentUser = useAppSelector((state) => state.user.currentUser);
    const { listings } = useListings();

    const userListings = listings.filter(
        (listing: IListing) => listing.creatorId === currentUser?.id
    );

    return (
        <Box sx={{ ml: 4 }}>
            {userListings.map((listing: IListing) => {
                
                return (
                    <Box 
                        key={listing.id}
                        sx={{ 
                            display: 'flex', 
                            p: 2, 
                            maxWidth: 900, 
                            mb: 2,
                            bgcolor: 'transparent',
                            cursor: 'pointer',
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                            borderRadius: 2,
                            justifyContent: 'space-between',
                        }}
                    >
                        <Box sx={{ display: 'flex' }}>
                            <Box
                                component='img'
                                src="https://placehold.co/180x180"
                                alt='Фото'
                                sx={{
                                    width: 180,
                                    height: 180,
                                    borderRadius: 2,
                                    mr: 2,
                                    mt: 1
                                }}
                            />
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {listing.title}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {listing.description}
                                </Typography>
                                <Box mt={1}>
                                    <Typography variant="body1">Город: {listing.city}</Typography>
                                    <Typography variant="body1">Цена: {listing.price.toLocaleString()} ₽</Typography>
                                    <Typography variant="body1">Тип: {typeMap[listing.type]}</Typography>
                                    <Typography variant="body1">Статус: {statusMap[listing.status]}</Typography>
                                </Box>
                            </CardContent>
                        </Box>

                        <Box 
                            sx={{ 
                                minWidth: 150, 
                                display: 'flex', 
                                alignItems: 'flex-start', 
                                justifyContent: 'flex-end', 
                                pr: 2,
                                pt: 1
                            }}
                        >
                            <Typography variant="subtitle2" color="text.secondary">
                                Контакты:<br />
                                {currentUser.firstName} {currentUser.lastName} <br />
                                {currentUser.email}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default UserListings;