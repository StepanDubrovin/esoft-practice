import {validationResult} from "express-validator";
import {NextFunction, Response} from "express";
import ListingService from "../services/listing.service";
import { ApiError } from "../exceptions/api_errors";
import { IListingsFilters } from "../interfaces/IListingsFilters";


class ListingController {
    private listingService: ListingService;

    constructor(listingService: ListingService) {
        this.listingService = listingService;
    }

    createListing = async (req: any, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errorMessages),
                );
            }

            const newListing = await this.listingService.createListing(
                req.user.id,
                req.body
            );
            
            res.status(201).json(newListing);
        } catch (e) {
            next(e);
        }
    };

    getListingById = async (req: any, res: Response, next: NextFunction) => {
        try {
            const listing_id = req.params.listing_id;
            
            const listing = await this.listingService.getListingById(listing_id);

            if(listing) {
                res.status(200).json(listing);
            } else {
                return next (
                    ApiError.NotFound('Информация о объявлении не найдена')
                );
            }
        } catch (e) {
            next(e);
        }
    };

    getAllListings = async (req: any, res: Response, next: NextFunction) => {
        try {
            const filters = req.query as IListingsFilters;
            const listings = await this.listingService.getAllListings(filters);
            
            if (listings) {
                res.status(200).json(listings);
            } else {
                return next (
                    ApiError.NotFound('Информация о объявлениях не найдена')
                );
            }
        } catch (e) {
            next(e);
        }
    };

    updateListing = async (req: any, res: Response, next: NextFunction) => {
        try {
            const listing_id = req.params.listing_id;
            const listing = await this.listingService.updateListing(listing_id, req.body);

            if (listing) {
                res.status(200).json(listing)
            }  else {
                return next(
                    ApiError.NotFound(`Информация о объявлении не найдена`)
                );
            }
        } catch (e) {
            next(e);
        }
    };

    deleteListing = async (req: any, res: Response, next: NextFunction) => {
         try {
            const listing_id = req.params.listing_id;

            await this.listingService.deleteListing(listing_id);

            res.status(200).json('Объявление успешно удалено');
        } catch (e) {
            next(e);
        }
    }
}

export default ListingController;