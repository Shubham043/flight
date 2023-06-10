import express from 'express';
import mongoose from 'mongoose';
import priceController from './controllers/price.js';
import cors from "cors";
import userController from './controllers/user.js'
import { authMiddleware } from './middleware/auth.js';


const app = express();

const MONGO_URI =
  'mongodb+srv://rawanshubham:0000@cluster0.9s8rqw5.mongodb.net/?retryWrites=true&w=majority';

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});
mongoose.connection.on('error', (error) => console.log(error));

app.use(express.json());
app.use(cors());
app.use('/api/price', priceController);
app.use('/user',userController);
app.get('/', (req, res) => {
  res.json('Hi there!');
});

app.listen(8050, () => {
  console.log('Server is running on port 8050');
});
