import React from "react";
import { useState } from "react";
import ListingService from "../services/listing.service";
import { ListingType, ListingStatus } from "../constants/listing";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { ICreateListing } from "../interfaces/ICreateListing";

const CreateListingForm: React.FC<ICreateListing> = ({ setTabIndex  
}) => {
    
    const [listingData, setListingData] = useState({
        title: '',
        description: '',
        price: '',
        city: '', 
        type: ListingType.SALE,
        status: ListingStatus.ACTIVE,
    });

    const [error, setError] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value} = e.target;

        setListingData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }; 

    const handleSelectChange = (e: SelectChangeEvent) => {
        const { name, value} = e.target;

        setListingData((prev) => ({
            ...prev,
            [name]: Number(value),
        }));
    }; 

    const handleListing = async () => {

        try {
            await ListingService.createListing({
                title: listingData.title,
                description: listingData.description || undefined,
                price: Number(listingData.price),
                city: listingData.city,
                type: listingData.type,
                status: listingData.status
            });

            setListingData({
                title: '',
                description: '',
                price: '',
                city: '',
                type: ListingType.SALE,
                status: ListingStatus.ACTIVE
            });
            setError(false);
            setTabIndex(1)
        } catch  {
            setError(true);
        }
    }

    return (
        <Box
            sx={{
                maxWidth: '400px',
                mx: 'auto',
                p: 3
            }}
        >
            <Typography align="center" variant="h5" sx={{ mb: 2}} >
                Создать объявление
            </Typography>
            <TextField
                fullWidth
                label='Название'
                name='title'
                value={listingData.title}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
                slotProps={{
                    input: {
                        sx: {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'black',
                            },
                            "&.Mui-focused": {
                                color: "black",
                            },  
                        }   
                    },
                    inputLabel: {
                        sx: {
                            "&.Mui-focused": {
                                color: "black",
                            },  
                        }
                    }
                }}
            />
            <TextField
                fullWidth
                label='Описание'
                name='description'
                value={listingData.description}
                onChange={handleInputChange}
                multiline
                sx={{ mb: 2 }}
                slotProps={{
                    input: {
                        sx: {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'black',
                            },
                            "&.Mui-focused": {
                                color: "black",
                            },  
                        }   
                    },
                    inputLabel: {
                        sx: {
                            "&.Mui-focused": {
                                color: "black",
                            },  
                        }
                    }
                }}
            />
            <Box sx={{display: 'flex', gap: 2, mb: 2}}>
                <TextField
                    fullWidth
                    label='Цена'
                    name='price'
                    value={listingData.price}
                    onChange={handleInputChange}
                    type='number'
                    sx={{ mb: 2 }}
                    slotProps={{
                    input: {
                        sx: {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'black',
                            },
                            "&.Mui-focused": {
                                color: "black",
                            },  
                        }   
                    },
                    inputLabel: {
                        sx: {
                            "&.Mui-focused": {
                                color: "black",
                            },  
                        }
                    }
                }}
                />
                <FormControl fullWidth>
                    <InputLabel id='type-label'>Тип объявления</InputLabel>
                    <Select
                        labelId="type-label"
                        name='type'
                        value={String(listingData.type)}
                        onChange={handleSelectChange}
                        label='Тип объявения'
                        
                    >
                        <MenuItem value={ListingType.RENT}>Аренда</MenuItem>
                        <MenuItem value={ListingType.SALE}>Продажа</MenuItem>
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{display: 'flex', gap: 2, mb: 2}}>
                <TextField
                    fullWidth
                    label="Город"
                    name="city"
                    value={listingData.city}
                    onChange={handleInputChange}
                    sx={{ mb: 2 }}
                    slotProps={{
                    input: {
                        sx: {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'black',
                            },
                            "&.Mui-focused": {
                                color: "black",
                            },  
                        }   
                    },
                    inputLabel: {
                        sx: {
                            "&.Mui-focused": {
                                color: "black",
                            },  
                        }
                    }
                }}
                />
            <FormControl fullWidth>
                <InputLabel id='status-label'>Статус</InputLabel>
                <Select
                    labelId="status-label"
                    name='status'
                    value={String(listingData.status)}
                    onChange={handleSelectChange}
                    label='Статус'
                >
                    <MenuItem value={ListingStatus.ACTIVE}>Активно</MenuItem>
                    <MenuItem value={ListingStatus.SOLD}>Продано</MenuItem>
                    <MenuItem value={ListingStatus.RENTED}>Сдано</MenuItem>
                    <MenuItem value={ListingStatus.ARCHIVED}>В архиве</MenuItem>
                </Select>
            </FormControl >
            </Box>   
            <Button
                fullWidth
                size="large"
                sx={{
                    backgroundColor: "#131313",
                    color: '#fff',
                }}
                
                onClick={handleListing}
            >
                Создать
            </Button>
        </Box>
    )
}

export default CreateListingForm;