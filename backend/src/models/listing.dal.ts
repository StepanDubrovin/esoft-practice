import db from "../db";
import { ApiError } from "../exceptions/api_errors";
import { ICreateListingData } from "../interfaces/ICreateListingData";
import { IUpdateListingData } from "../interfaces/IUpdateListingData";

class ListingModel {
    async create(listingData: ICreateListingData) {
        try {
            const query = db('listings');
            await query.insert(listingData)
        } catch (err) {
            console.error('Error creating listing', err);
            throw err;
        }
    }

    async getById(listing_id: string) {
        try {
            const query = db('listings');
            return await query.where('id', listing_id).first();
        } catch (err) {
            console.error('Error fetching listing by ID', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async update(listing_id: string, updatedData: IUpdateListingData) {
        try {
            const query = db('listings');
            return await query.
                where('id', listing_id)
                .update({
                    title: updatedData.title,
                    description: updatedData.description,
                    price: updatedData.price,
                    type: updatedData.type,
                    city: updatedData.city,
                    status: updatedData.status
                })
        } catch (err) {
            console.error('Error updating listing', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }

    async delete(listing_id: string) {
        try {
            const query = db('listings');
            await query.where('id', listing_id).delete();
        } catch (err) {
            console.error('Error deleting listing', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }
}

export default ListingModel;