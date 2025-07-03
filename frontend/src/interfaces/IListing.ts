import { ListingStatus, ListingType } from "../constants/listing";

export interface IListing {
    id: string,
    title: string,
    price: number,
    city: string,
    type: ListingType,
    status: ListingStatus,
    description?: string,
    creatorId: string
}