import { ListingType, ListingStatus } from "../constants/listing";

export interface IListingsFilters {
    city?: string,
    type?: ListingType,
    sortPrice?: 'asc' | 'desc',
    priceFrom?: number,
    priceTo?: number 
}