import express from 'express'
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import UserModel from './models/user.dal';
import UserService from './services/user.service';
import UserController from './controllers/user.controller';
import userRoutes from './routes/user.route';
import TokenService from './services/token.service';

import ListingModel from './models/listing.dal';
import ListingService from './services/listing.service';
import ListingController from './controllers/listing.controller';
import listingRoutes from './routes/listing.route';

const app = express();
const port = Number(process.env.PORT);

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
)

app.use(cookieParser());
app.use(express.json());

const userService = new UserService(new UserModel(), new TokenService);
const userController = new UserController(userService);

const listingService = new ListingService(new ListingModel);
const listingController = new ListingController(listingService);

app.use('/api', userRoutes(userController));
app.use('/api', listingRoutes(listingController));

app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT localhost:${port}`);
})
