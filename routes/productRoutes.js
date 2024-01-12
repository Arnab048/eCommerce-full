import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProdctController,
  updateProdctController,
  getProductController,
  getSingleProductController,
  productPhotoController,
  deleteProductController,
} from "../controllers/productController.js";
import formidable from "express-formidable";
import fs from "fs";

const router = express.Router();

// routes

// create
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProdctController
);
// Update
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateProdctController
);

// get
router.get("/get-procuct", getProductController);

// get single Product
router.get("/get-procuct/:slug", getSingleProductController);

// get photo
router.get("/product-photo/:pid", productPhotoController);

// delete product
router.delete("/product/:pid", deleteProductController);

export default router;
