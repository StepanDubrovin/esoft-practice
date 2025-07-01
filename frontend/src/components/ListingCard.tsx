import React from "react";
import { 
    Card, 
    CardContent, 
    Typography, 
    Box } 
from '@mui/material';
import { IListingCard } from "../interfaces/IListingCard";
import { typeMap, statusMap } from "../constants/listingsMap";

const ListingCard: React.FC<IListingCard> = ({
    title,
    price,
    city,
    type, 
    status,
    description
}) => {
    return (
        <Card sx={{ maxWidth: 400, mb: 2 }}>
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
        </Card>
    )
};

export default ListingCard;