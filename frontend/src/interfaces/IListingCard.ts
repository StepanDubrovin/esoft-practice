import { ListingStatus, ListingType } from "../constants/listing";

export interface IListingCard {
    id: string,
    title: string,
    price: number,
    city: string,
    type: ListingType,
    status: ListingStatus,
    description?: string,
    creatorId: string, 
    author?: {
        firstName: string,
        lastName: string,
        email: string
    },
    showDelete?: boolean,
    onDelete?: (id: string) => void  
}