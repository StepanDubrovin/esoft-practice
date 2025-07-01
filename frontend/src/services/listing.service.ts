import { ListingStatus, ListingType } from "../constants/listing";
import $api from "../http";
import { AxiosResponse } from "axios";
import { IListingFilters } from "../interfaces/IListingFilters";


export default class ListingService {
    static async createListing(
        listingData: {
            title: string;
            description?: string;
            price: number;
            type: ListingType;
            city: string;
            status: ListingStatus;
            creatorId: string
        }
    ) : Promise<AxiosResponse> {
        return $api.post('/listing', listingData);
    }

    static async getAllListing(filters?: IListingFilters): Promise<AxiosResponse> {
        return $api.get('/listings', {
            params: filters
        });
    }

    static async updateListing(
        listing_id: string,
        listingData: {
            title: string;
            description?: string;
            price: number;
            type: ListingType;
            city: string;
            status: ListingStatus;
        }
    ) : Promise<AxiosResponse> {
        return $api.patch(`/listing/${listing_id}`, listingData)
    }

    static async getListing(
        listing_id: string, 
    ) : Promise<AxiosResponse> {
        return $api.get(`/listing/${listing_id}`)
    }

    static async deleteListing() : Promise<AxiosResponse> {
        return $api.delete(`/listing`)
    } 

}