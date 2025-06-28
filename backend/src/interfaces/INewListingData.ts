import { ListingType, ListingStatus } from "../constants/listing"

export interface INewListingData {
    title: string,
    description?: string,
    price: number,
    type: ListingType,
    city: string,
    status: ListingStatus,
}