const express = require("express");
// const { getProducts } = require("../Controllers/ProductController");
const ensureAuth = require("../Middlewares/Auth");

const router = express.Router();

router.get("/", ensureAuth, (req, res) => {
  res.status(200).json([
    {
      id: 1,
      name: "Mobile",
      price: 10000,
    },
    {
      id: 2,
      name: "Laptop",
      price: 50000,
    },
  ]);
});

module.exports = router;
