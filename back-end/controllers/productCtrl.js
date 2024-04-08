const Product = require("../models/productModel");

// Sorting, sorting, Paging...
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filtering() {
    const queryObj = { ...this.queryString };
    const excludedField = [`page`, "sort", "limit"];
    excludedField.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    this.query.find(JSON.parse(queryStr));
    return this;
  }

  sorting() {
    if (this.queryString.sort) {
      const soryBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(soryBy);

      console.log(soryBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;

    const limit = this.queryString.limit * 1 || 9;

    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

const productCtrl = {
  getProduct: async (req, res) => {
    try {
      const features = new APIfeatures(Product.find(), req.query)
        .filtering()
        .sorting()
        .pagination();
      const product = await features.query;
      res.json({ result: product });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
        checkd,
        sold,
      } = await req.body;

      if (!images) {
        return res.status(400).json({ message: "No Image" });
      }

      const product = await Product.findOne({ product_id });

      if (product) {
        return res
          .status(400)
          .json({ message: "This is Product already exists" });
      }
      const newProduct = new Product({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });

      await newProduct.save();
      res.json({ message: "New Product Added" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Deleted Product" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const { title, price, description, content, images, category } = req.body;
      if (!images) {
        return res.status(400).json({ message: "Not Image" });
      }

      await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );

      res.json({ message: "Product Updated" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productCtrl;
