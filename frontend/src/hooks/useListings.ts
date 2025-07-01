import { useEffect, useState } from "react";
import ListingService from "../services/listing.service";
import { IListingFilters } from "../interfaces/IListingFilters";


export const useListings = (filters?: IListingFilters) => {
    const [listings, setListings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ListingService.getAllListing(filters);
                setListings(response.data);
            } catch (err) {
                console.error('Ошибка при загрузке объявлений', err);
            }   
        };
        fetchData();
    }, [filters])   
    return { listings }
}