import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

//@desc     Fetch all products
//@req      GET /api/products
//@access   Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 8;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const count = await Product.countDocuments({ ...keyword });
  const products = await Product.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

//@desc     Fetch single product by id
//@req      GET /api/products/:id
//@access   Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product Not found");
  }
});

//@desc     DELETE product
//@req      DELETE /api/products/:id
//@access   Private/admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product Not found");
  }
});

//@desc     Create A product
//@req      Post /api/products/
//@access   Private/admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample ",
    price: 550,
    description:
      "Description Epoxy Resin Decorative Lamp with 100% natural teak wood. Each piece is different and made upon special order.Production period is 8-10 days plus shippingDetails  Material -  `` TeakItem Dimensions - 25*25*15(cm)Item Weight - 400gramsTop Material - TeakFrame Material - Wood",
    image: "/images/sample.jpg",
    amazonLink: "https://www.amazon.in/",
    flipkartLink: "https://www.amazon.in/",
    featured: false,
    user: req.user._id,
  });
  const newProduct = await product.save();
  res.json(newProduct);
});

//@desc     Update A product
//@req      PUT /api/products/:id
//@access   Private/admin

const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    featured,

    description,
    amazonLink,
    flipkartLink,
    image,
  } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.featured = featured;
    product.flipkartLink = flipkartLink;
    product.amazonLink = amazonLink;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@desc     Create a new review
//@req      PUT /api/products/:id/review
//@access   Private/admin

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const product = await Product.findById(req.params.id);
  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product Already Reviewed");
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };
    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added succesfully" });
  } else {
    res.status(404);
    throw new Error("Product Not Found");
  }
});

//@desc     Get top rated Products
//@req      GET /api/products/top
//@access   Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).limit(4);

  res.json(products);
});

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
};
