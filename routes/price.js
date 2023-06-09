import { createPrice, getpricebysource } from "../controllers/price.js";
import express from "express";
import { Router } from "express";
import priceModel from "../models/price.js"; // Corrected import statement
const router = Router();

router.get("/price", getpricebysource);
router.post("/price", createPrice);

export default router;
