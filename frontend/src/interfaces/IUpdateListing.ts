import { IListing } from "./IListing";

export interface IUpdateListing {
    open: boolean;
    onClose: () => void;
    listing: IListing;
    setListings: React.Dispatch<React.SetStateAction<IListing[]>>;
}