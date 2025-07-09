import { ListingStatus, ListingType } from "../src/constants/listing";
import ListingService from "../src/services/listing.service";


const mockListingModel = {
    create: jest.fn(),
    getById: jest.fn(),
    getAll: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const listingService = new ListingService(mockListingModel as any);

describe('ListingService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should create a new listing and return it', async () => {
        mockListingModel.create.mockResolvedValue({id: '1', title: 'listing'});
        const listing = await listingService.createListing('user1', {
            title: 'listing', 
            description: '', 
            price: 444,
            city: 'Тюмень',
            type: ListingType.RENT,
            status: ListingStatus.ACTIVE,
        });
        expect(listing).toBeDefined();
        expect(mockListingModel.create).toHaveBeenCalled();
    });

    it('should return all listings for a user', async () => {
        mockListingModel.getAll.mockResolvedValue([{id: '1'}, {id: '2'}]);

        const res = await listingService.getAllListings({
            city: 'Тюмень',
            type: ListingType.RENT,
        });

        expect(res?.length).toBe(2);
    });

    it('should update task and return updated task', async () => {
        mockListingModel.update.mockResolvedValue({id: '1', title: 'updated'});

        const updated = await listingService.updateListing('1', {
            title: 'updated',
            description: 'updated desc',
            price: 444,
            city: 'Тюмень',
            type: ListingType.SALE,
            status: ListingStatus.ARCHIVED
        });

        // @ts-ignore
        expect(updated.title).toBe('updated')

    });

})