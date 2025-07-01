import { ListingStatus, ListingType } from "./listing";


export const typeMap = {
    [ListingType.RENT]: 'Аренда',
    [ListingType.SALE]: 'Продажа'
};

export const statusMap = {
    [ListingStatus.ACTIVE]: 'Активно',
    [ListingStatus.SOLD]: 'Продано',
    [ListingStatus.RENTED]: 'Сдано',
    [ListingStatus.ARCHIVED]: 'Архивировано',
}