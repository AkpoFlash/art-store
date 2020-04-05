const cuid = require("cuid");
const Validation = require("./validation");

const db = require("../db/printshop").mongoose;

const Product = db.model("Product", {
  _id: { type: String, default: cuid },
  description: { type: String, required: true },
  imgThumb: {
    type: String,
    required: true,
    ...Validation.urlSchema(),
  },
  img: {
    type: String,
    required: true,
    ...Validation.urlSchema(),
  },
  link: {
    type: String,
    ...Validation.urlSchema(),
  },
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userLink: {
    type: String,
    ...Validation.urlSchema(),
  },
  tags: { type: [String], index: true },
});

const create = async (fields) => {
  return await new Product(fields).save();
};

const getList = async (opt = {}) => {
  const { limit = 25, offset = 0, tag } = opt;

  const query = tag ? { tags: tag } : {};

  return await Product.find(query).sort({ _id: 1 }).skip(offset).limit(limit);
};

const getById = async (id) => {
  return await Product.findById(id);
};

const updateById = async (id, body) => {
  const product = await getById(id);

  Object.keys(body).forEach((key) => {
    product[key] = body[key];
  });
  await product.save();

  return product;
};

const deleteById = async (id) => {
  await Product.deleteOne({ _id: id });
};

module.exports = {
  getList,
  getById,
  create,
  updateById,
  deleteById,
};
