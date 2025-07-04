import React from "react";
import { 
    CardContent, 
    Typography, 
    Box 
} from '@mui/material';
import { IListingCard } from "../interfaces/IListingCard";
import { typeMap, statusMap } from "../constants/listingsMap";
import { useAppSelector } from "../hooks/hooks";

const ListingCard: React.FC<IListingCard> = ({
    title,
    price,
    city,
    type, 
    status,
    description, 
    creatorId, 
    author
}) => {
    const users = useAppSelector((state) => state.user.users);
    const authorUsers = users.find((u) => String(u.id) === String(creatorId));

    const displayAuthor = author || authorUsers;

    return (
        <Box 
            sx={{ 
                display: 'flex', 
                p: 2, 
                maxWidth: 900, 
                mb: 2,
                bgcolor: 'transparent',
                cursor: 'pointer',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' },
                borderRadius: 2,
                justifyContent: 'space-between'
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
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {description}
                    </Typography>
                    <Box mt={1}>
                        <Typography variant="body1">Город: {city}</Typography>
                        <Typography variant="body1">Цена: {price.toLocaleString()} ₽</Typography>
                        <Typography variant="body1">Тип: {typeMap[type]}</Typography>
                        <Typography variant="body1">Статус: {statusMap[status]}</Typography>
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
                    {displayAuthor.firstName} {displayAuthor.lastName} <br />
                    {displayAuthor?.email}
                </Typography>
            </Box>
        </Box>
    );
};

export default ListingCard;
