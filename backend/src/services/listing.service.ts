import { v7 as uuidv7 }from 'uuid';
import { INewListingData } from "../interfaces/INewListingData";
import ListingModel from "../models/listing.dal";
import { IListingsFilters } from '../interfaces/IListingsFilters';
import { IUpdateListingData } from '../interfaces/IUpdateListingData';


class ListingService {
    private listingModel: ListingModel;

    constructor(listingModel: ListingModel) {
        this.listingModel = listingModel;
    }

    async createListing(user_id: string, listingData: INewListingData) {
        return await this.listingModel.create({
            id: uuidv7(),
            creatorId: user_id , 
            ...listingData
        });
    }

    async getListingById(listing_id: string) {
        return await this.listingModel.getById(listing_id);
    }

    async getAllListings(filters: IListingsFilters) {
        return await this.listingModel.getAll(filters);
    }

    async updateListing(listing_id: string, updatedData: IUpdateListingData){
        return await this.listingModel.update(listing_id, updatedData);
    }

    async deleteListing(listing_id: string) {
        return await this.listingModel.delete(listing_id);
    }
}

export default ListingService;