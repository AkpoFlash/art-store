const cuid = require("cuid");

const Validation = require("./validation");
const db = require("../db/printshop").mongoose;

const Order = db.model("Order", {
  _id: { type: String, default: cuid },
  buyerEmail: { type: String, required: true, ...Validation.emailSchema() },
  products: [{ type: String, ref: "Product", index: true, required: true }],
  status: {
    type: String,
    index: true,
    default: "CREATED",
    enum: ["CREATED", "PENDING", "COMPLETED"],
  },
});

const create = async (fields) => {
  return await new Order(fields).save();
};

const getList = async (opt = {}) => {
  const { limit = 25, offset = 0, tag } = opt;

  const query = tag ? { tags: tag } : {};

  return await Order.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
};

const getById = async (id) => {
  return await Order.findById(id).populate("products").exec();
};

module.exports = {
  create,
  getList,
  getById,
};
