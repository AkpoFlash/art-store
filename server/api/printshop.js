const Product = require("../models/products");
const Order = require("../models/orders");

const listProducts = async (req, res) => {
  const { limit, offset, tag } = req.query;

  try {
    res.json(
      await Product.getList({
        limit: Number(limit),
        offset: Number(offset),
        tag,
      })
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.getById(Number(id));
    if (!product) return next();

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);
  res.json(product);
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  res.json(await Product.updateById(Number(id), body));
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  await Product.deleteById(Number(id));
  res.json({ success: true });
};

const listOrder = async (req, res, next) => {
  const { offset = 0, limit = 25, productId, status } = req.query;

  const orders = await Order.getList({
    offset: Number(offset),
    limit: Number(limit),
    productId: Number(productId),
    status,
  });

  res.json(orders);
};

const createOrder = async (req, res, next) => {
  const order = await Order.create(req.body);
  res.json(order);
};

module.exports = {
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,

  listOrder,
  createOrder,
};
