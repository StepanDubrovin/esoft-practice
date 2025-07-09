import React from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";
import { ListingType } from "../constants/listing";
import { useListingFilters } from "../hooks/useListingFilters";
import { typeMap } from "../constants/listingsMap";

const cities = ["Москва", "Санкт-Петербург", "Тюмень", 
    "Екатеринбург", "Новосибирск", "Сургут" ];
const listingTypes = Object.values(ListingType).filter(
    (v) => typeof v === 'number'
) as ListingType[];

const sortOptions = [
    { value: "asc", label: "По возрастанию" },
    { value: "desc", label: "По убыванию" }
];

interface ListingFiltersProps {
  onApply: (filters: any) => void;
}

const ListingFilters: React.FC<ListingFiltersProps> = ({ onApply }) => {
    const { filters, setFilter, applyFilters, resetFilters } = useListingFilters();

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
                value={filters.city || ''}
                onChange={(e) => setFilter('city', e.target.value)}
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
                <MenuItem key={city} value={city}>{city}</MenuItem>
            ))}
            </TextField>

            <TextField
                select
                label="Тип"
                fullWidth
                margin="normal"
                value={filters.type || ''}
                onChange={(e) => setFilter('type', Number(e.target.value))}
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
                    <MenuItem key={type} value={type}>{typeMap[type]}</MenuItem>
                ))}
            </TextField>

            <TextField
                select
                label="Сортировка по цене"
                fullWidth
                margin="normal"
                value={filters.sortPrice || 'desc'}
                onChange={(e) => setFilter('sortPrice', e.target.value)}
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
                value={filters.priceFrom ?? ''}
                onChange={(e) => setFilter('priceFrom', Number(e.target.value) || '')}
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
                    value={filters.priceTo ?? ''}
                    onChange={(e) => setFilter('priceTo', Number(e.target.value) || '')}
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

            <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                    mt: 3, 
                    bgcolor: 'black', 
                    textTransform: 'none', 
                    }}
                onClick={() => onApply(applyFilters())}
                >
                Применить
            </Button>
            
            <Button
                variant="text"
                fullWidth
                sx={{ mt: 1, textTransform: "none", color: 'black',  }}
                
                onClick={() => {
                resetFilters();
                onApply({});
                }}
            >
                Сбросить
            </Button>
        </Box>
    );
};

export default ListingFilters;
