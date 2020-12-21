import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },

    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      required: true,
    },
    amazonLink: {
      type: String,
      required: true,
    },
    flipkartLink: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
