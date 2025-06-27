import { ListingType, ListingStatus } from "../constants/listing";

export interface IUpdateListingData {
    title: string,
    description?: string,
    price: number,
    type: ListingType,
    city: string,
    status: ListingStatus,
}