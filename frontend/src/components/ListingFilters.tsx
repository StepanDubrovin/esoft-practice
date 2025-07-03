import React from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { ListingType } from "../constants/listing";

const cities = ["Москва", "Тюмень" ];
const listingTypes = Object.values(ListingType);
const sortOptions = [
    { value: "asc", label: "По возрастанию" },
    { value: "desc", label: "По убыванию" }
];

const ListingFilters: React.FC = () => {
    return (
        <Box 
            sx={{ 
                width: 250, 
                p: 2, 
                minHeight: '100vh',
                boxSizing: 'border-box'
            }}
        >
            <Typography variant="h5" align="center">Фильтр</Typography>

            <TextField
                select
                label="Город"
                fullWidth
                margin="normal"
                defaultValue=""
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
            <MenuItem value="" >Все</MenuItem>
            {cities.map((city) => (
                <MenuItem key={city} value={city} >{city}</MenuItem>
            ))}
            </TextField>

            <TextField
                select
                label="Тип"
                fullWidth
                margin="normal"
                defaultValue=""
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
            <MenuItem value="" >Все</MenuItem>
                {listingTypes.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Сортировка по цене"
                fullWidth
                margin="normal"
                defaultValue="desc"
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
            {sortOptions.map((opt) => (
                <MenuItem key={opt.value} value={opt.value} >
                    {opt.label}
                </MenuItem>
            ))}
            </TextField>

            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
            <TextField
                label="Цена от"
                type="number"
                fullWidth
                size="small"
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
                    label="до"
                    type="number"
                    fullWidth
                    size="small"
                    slotProps={{
                    input: {
                        sx: {
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'black',
                            }
                        }   
                    },
                }}
                />
            </Box>

            <Button variant="contained" fullWidth sx={{ mt: 3, bgcolor: 'black', textTransform: 'none', }}>
                Применить
            </Button>
        </Box>
    );
};

export default ListingFilters;
