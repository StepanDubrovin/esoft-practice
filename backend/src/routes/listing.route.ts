import express from "express";
import ListingController from "../controllers/listing.controller";
import { authenticateJWT } from "../middleware/auth.middleware";
import { body,  ValidationChain } from "express-validator";
import { ListingStatus, ListingType } from "../constants/listing";

const validateListing: ValidationChain[] = [
    body('title')
        .notEmpty().withMessage('Название объявления обязательно')
        .isLength({ max: 100 }).withMessage('Название задачи не должно превышать 100 символов'),
    
    body('description')
        .optional()
        .isLength({ max: 1000 }).withMessage('Описание задачи не должно превышать 1000 символов'),
    
     body('price')
        .notEmpty().withMessage('Цена обязательна'),

    body('city')
        .notEmpty().withMessage('Город обязателен'),
    
     body('type')
        .notEmpty().withMessage('Тип объявления обязателен')
        .isIn([ListingType.RENT, ListingType.SALE]).withMessage('Неверный тип объявления'),

    body('status')
        .notEmpty().withMessage('Статус обязателен')
        .isIn([
            ListingStatus.ACTIVE,
            ListingStatus.SOLD,
            ListingStatus.RENTED,
            ListingStatus.ARCHIVED
        ]).withMessage('Неверный статус объявления')
];

export default (listingController: ListingController) => {
    const router = express.Router();

    router.use(authenticateJWT);

    router.post('/listing', validateListing, listingController.createListing);
    router.get('/listings', listingController.getAllListings);
    router.get('/listing/:listing_id', listingController.getListingById);
    router.put('/listing/:listing_id', listingController.updateListing);
    router.delete('/listing/:listing_id', listingController.deleteListing);

    return router;
}
        