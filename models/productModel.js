const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please Enter Product Name"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "please Enter Product Description"],
  },
  price: {
    type: String,
    required: [true, "please Enter Product Price"],
    // maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    // default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
        default: "hii",
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  shops: [
    {
      shopname: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      rating: {
        type: String,
        required: true,
      },

      numberOfReviews: {
        type: Number,
        required: true,
      },
      assured: {
        type: Boolean,
        required: true,
      },

      productionTime: {
        type: Number,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please Enter Product Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please enter Stock of the Product"],
    maxlength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
