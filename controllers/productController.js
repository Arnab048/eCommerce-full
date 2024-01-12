import productModel from "../models/productModel.js";
import slugify from "slugify";

export const createProdctController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return resizeBy.status(500).send({
          error: "Name is Require",
        });
      case !slug:
        return resizeBy.status(500).send({
          error: "Name is Require",
        });
      case !description:
        return resizeBy.status(500).send({
          error: "description is Require",
        });
      case !price:
        return resizeBy.status(500).send({
          error: "price is Require",
        });
      case !category:
        return resizeBy.status(500).send({
          error: "category is Require",
        });
      case !quantity:
        return resizeBy.status(500).send({
          error: "quantity is Require",
        });
      case photo && photo.size > 1000000:
        return resizeBy.status(500).send({
          error: "quantity is Require and should be less than 1MB",
        });
    }

    const products = new productModel({ ...req.fields, slug: slugify(name) });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });

    // const product = await productModel
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Creating Product",
    });
  }
};

// update
export const updateProdctController = async (req, res) => {
  try {
    const { name, description, slug, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    switch (true) {
      case !name:
        return resizeBy.status(500).send({
          error: "Name is Require",
        });
      case !slug:
        return resizeBy.status(500).send({
          error: "Name is Require",
        });
      case !description:
        return resizeBy.status(500).send({
          error: "description is Require",
        });
      case !price:
        return resizeBy.status(500).send({
          error: "price is Require",
        });
      case !category:
        return resizeBy.status(500).send({
          error: "category is Require",
        });
      case !quantity:
        return resizeBy.status(500).send({
          error: "quantity is Require",
        });
      case photo && photo.size > 1000000:
        return resizeBy.status(500).send({
          error: "quantity is Require and should be less than 1MB",
        });
    }

    const products = await productModel.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      success: true,
      message: "Product Created Successfully",
      products,
    });

    // const product = await productModel
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Creating Product",
    });
  }
};

// get all product
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Product Fetched Successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting Product",
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Product Fetched Successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting Product",
    });
  }
};

// get product photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting Product Photo",
    });
  }
};

// deete product
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");

    res.status(200).send({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while Deleting Product",
    });
  }
};
