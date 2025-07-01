import { ListingStatus, ListingType } from "../constants/listing";

export interface IListingCard {
    title: string,
    price: number,
    city: string,
    type: ListingType,
    status: ListingStatus,
    description?: string
}