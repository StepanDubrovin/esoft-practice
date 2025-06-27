import { ListingType, ListingStatus } from "../constants/listing"

export interface ICreateListingData {
    id: string,
    title: string,
    description?: string,
    price: number,
    type: ListingType,
    city: string, 
    status: ListingStatus,
    creatorId: string
}