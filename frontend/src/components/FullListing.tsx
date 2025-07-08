import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { typeMap, statusMap } from "../constants/listingsMap";
import { ListingStatus, ListingType } from "../constants/listing";
import { useListings } from "../hooks/useListings"; 
import { useAppSelector } from "../hooks/hooks";

const FullListing: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { listings } = useListings(); 
    const users = useAppSelector((state) => state.user.users); 

    const listing = listings.find((l) => String(l.id) === String(id));
   
    const author = users.find((u) => String(u.id) === String(listing?.creatorId));

    return (
        <Box sx={{  p: 3,  }}>
            
            <Typography variant="h4" gutterBottom fontWeight='bold'>
                {listing?.title}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 3,
                    flexWrap:'wrap'
                }}
            >
                <Box
                    component="img"
                    src="https://placehold.co/600x400"
                    alt="Фото"
                    sx={{ 
                        width: "100%", 
                        maxWidth: 600, 
                        borderRadius: 2, 
                    }}
                />    
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        gap: 2,
                        minWidth: '220px',

                        pt: 6
                    }}
                >
                    <Typography variant="h4" fontWeight='bold'>Цена: {listing?.price.toLocaleString()} ₽</Typography>
                    <Box>
                        <Typography variant="h5"><strong>Контакты:</strong></Typography>
                        <Typography>{author?.firstName} {author?.lastName}</Typography>
                        <Typography>{author?.email}</Typography>
                    </Box>    
                </Box>
            </Box>
            
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" sx={{ mb: 2 }}><strong>Описание: </strong>{listing?.description}</Typography>

                <Typography variant="h6" ><strong>Город: </strong>{listing?.city}</Typography>
                <Typography variant="h6"><strong>Тип: </strong>{typeMap[listing?.type as ListingType]}</Typography>
                <Typography variant="h6"><strong>Статус: </strong>{statusMap[listing?.status as ListingStatus]}</Typography>
            </Box>

            
        </Box>
    );
};

export default FullListing;
