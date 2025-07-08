import { useState } from "react";
import { IListingFilters } from "../interfaces/IListingFilters";

export const useListingFilters = () => {
    const [filters, setFilters] = useState<IListingFilters>({
        sortPrice: 'desc'
    });

    const setFilter = (key: keyof IListingFilters, value: any) => {
        setFilters((prev) => ({
            ...prev,
            [key]: value || undefined,
        }));
    };

    const applyFilters = () => filters;

    const resetFilters = () => {
        setFilters({ sortPrice: 'desc' });
    };

    return {
        filters,
        setFilter,
        applyFilters,
        resetFilters
    };

}