import { ListingType } from "../constants/listing";

export interface IListingFilters {
    city?: string;
    type?: ListingType;
    sortPrice?: 'asc' | 'desc';
    priceFrom?: number,
    priceTo?: number 
}