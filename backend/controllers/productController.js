const dotenv = require("dotenv");
const db = require("../models");
const Product = db.Product;
const Categories = db.Categories;

dotenv.config;

const getAllProduct = async (req, res) => {
  try {
    const product = await Product.findAll();
    res.json(product);
  } catch (error) {
    res.json("Không lấy được sản phẩm nào" + error);
    console.log(error);
  }
};

const getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({
        message: `không tìm thấy ${productId}.`,
      });
    } else {
      res.json(product);
    }
  } catch (error) {
    res.status(500).json({
      message: "lỗi trong quá trình tìm id " + productId,
    });
  }
};

const addProduct = async (req, res) => {
  // lấy dữ liệu từ body 
  const { productname, cost, profit, id_cat } = req.body;
  try {
    // kiểm tra cat có tt hay ko
    const cat = await Categories.findByPk(id_cat);
    if (!cat) {
      return res.status(404).json({
        message: `Id cat ${id_cat} không tồn tại`,
      });
    }
    // kiểm tra trung product
    const product_check = await Product.findOne({ where: { productname } });

    if (!productname || !cost || !profit || isNaN(profit) || isNaN(cost)) {   
        return res.status(200).json({
          message: "Thông tin không hợp, vui lòng nhập lại",
        });
    }

    if (!product_check) {
      const product = await Product.create({ productname, cost, profit, id_cat });
      return res.json({ message: "Thêm product thành công!" });
    }
    else {
      return res.status(400).json({ message: "Sản phẩm đã tồn tại." })
    }

  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      error
    });
  }
};

// update product
const updateProductById = async (req, res) => {
  const productId = req.params.id;
  const { productname, cost, profit, id_cat } = req.body;
  try {
    const product = await Product.findByPk(productId);
    const cat = await Categories.findByPk(id_cat);
    if (!productname || !cost || !profit || !id_cat) {
      res.status(400).json({
        message: `Vui lòng cung cấp đầy đủ thông tin sản phẩm.`,
      });
    } else if (!product) {
      res.status(404).json({
        message: `Id ${productId} không tồn tại.`,
      });
    } else if (!cat) {
      res.status(404).json({
        message: `Id cat ${id_cat} không tồn tại`,
      });
    } else {
      await product.update({
        productname,
        cost,
        profit,
        id_cat,
      });
      res.json({
        message: `Cập nhật id ${productId} thành công.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Lỗi cập nhật id " + productId,
    });
  }
};

const deleteProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({
        message: `không tìm thấy ${productId}.`,
      });
    } else {
      await product.destroy();
      res.json({
        message: `xóa id ${productId} thành công.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "lỗi trong quá trình xóa id " + productId,
    });
  }
};

module.exports = {
  getAllProduct,
  addProduct,
  updateProductById,
  deleteProductById,
  getProductById,
};
