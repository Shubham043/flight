import express from 'express';
import priceModel from '../models/price.js';
import userModel from "../models/user.js";

const router = express.Router();

// Fetch price by source
router.get('/', async (req, res) => {
  const age = await userModel.age;
  try {
    const { source, destination } = req.query;
    const price = await priceModel.findOne({ source, destination });
   if(age<18){
   price = price/2;
   };
    if (!price) {
      return res.status(404).json({ error: 'Price not found' });
    }

    res.status(200).json(price);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create price
router.post('/', async (req, res) => {
  try {
    const { source, destination, indigo, airasia, vistara } = req.body;
    const newPrice = await priceModel.create({
      source,
      destination,
      indigo,
      airasia,
      vistara,
    });
    res.status(201).json(newPrice);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
