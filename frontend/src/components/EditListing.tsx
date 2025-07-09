import React, { useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
} from "@mui/material";
import { ListingStatus, ListingType } from "../constants/listing";
import ListingService from "../services/listing.service";
import { IUpdateListing } from "../interfaces/IUpdateListing";


const EditListingModal: React.FC<IUpdateListing> = ({ open, onClose, listing, setListings }) => {
    
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: 0,
        type: ListingType.SALE,
        city: '',
        status: ListingStatus.ACTIVE
    });

    useEffect(() => {
        if (listing) {
            setForm({
                title: listing.title,
                description: listing.description!,
                price: listing.price,
                type: listing.type,
                city: listing.city,
                status: listing.status
            });
        }
    }, [listing])

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value} = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === 'price' ? +value : value
        }));
    };


    const handleSumbit = async () => {
        try {
            await ListingService.updateListing(listing.id, form);

            setListings((prev) => 
                prev.map((l) => (l.id === listing.id ? { ...l, ...form}: l))
            )

            onClose();
        } catch (err) {
            console.error('Ошибка при обновлении объявления', err)
        }
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    bgcolor: "background.paper",
                    p: 4,
                    borderRadius: 2,
                    width: 500,
                }}
            >
                <Typography variant="h6" gutterBottom align="center">
                    Редактировать объявление
                </Typography>

                <TextField
                    label='Название'
                    name="title"
                    fullWidth
                    value={form.title}
                    onChange={handleChange}
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
                    label='Описание'
                    name="description"
                    fullWidth
                    multiline
                    minRows={3}
                    value={form.description}
                    onChange={handleChange}
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
                    label='Цена'
                    name="price"
                    type="number"
                    fullWidth
                    value={form.price}
                    onChange={handleChange}
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
                <Box sx={{display: 'flex', gap: 2, mb: 2}}></Box>
                <TextField
                    select
                    label='Тип'
                    name="type"
                    fullWidth
                    value={form.type}
                    onChange={handleChange}
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
                >
                    <MenuItem value={ListingType.RENT}>Аренда</MenuItem>
                    <MenuItem value={ListingType.SALE}>Продажа</MenuItem>
                </TextField>
                <TextField
                    label='Город'
                    name="city"
                    fullWidth
                    value={form.city}
                    onChange={handleChange}
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
                    select
                    label='Статус'
                    name="status"
                    fullWidth
                    value={form.status}
                    onChange={handleChange}
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
                >
                    <MenuItem value={ListingStatus.ACTIVE}>Активно</MenuItem>
                    <MenuItem value={ListingStatus.SOLD}>Продано</MenuItem>
                    <MenuItem value={ListingStatus.RENTED}>Сдано</MenuItem>
                    <MenuItem value={ListingStatus.ARCHIVED}>В архиве</MenuItem>
                </TextField>
                <Button 
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSumbit}
                    sx={{
                        backgroundColor: "#131313",
                        textTransform: 'none',
                    }}
                >
                    Сохранить
                </Button>
            </Box>

        </Modal>
    )
}   

export default EditListingModal;