const dotenv = require("dotenv");
const db = require("../models");
const Images = db.Images;
const Product = db.Product;

dotenv.config;

const getAllImages = async (req, res) => {
  try {
    const images = await Images.findAll();
    res.json(images);
  } catch (error) {
    res.json("Không lấy được hình ảnh nào" + error);
    console.log(error);
  }
};

const addImages = async (req, res) => {
  const { url, name_img, id_product } = req.body;
  if (!url || !name_img || !id_product) {
    return res.status(400).json({ error: "Vui lòng điền đầy đủ thông tin" });
  }
  try {
    const product = await Product.findByPk(id_product);
    if (!product) {
      return res.status(404).json({
        message: `Id sản phẩm ${id_product} không tồn tại.`,
      });
    }
    const images = await Images.create({ url, name_img, id_product });
    res.json({
      images,
      message: "Thêm hình ảnh thành công!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Thêm hình ảnh thất bại!" });
  }
};

const updateImagestById = async (req, res) => {
  const imagesId = req.params.id;
  const { url, name_img, id_product } = req.body;

  try {
    const images = await Images.findByPk(imagesId);

    if (!url || !name_img || !id_product) {
      res.status(400).json({
        message: "Vui lòng cung cấp đầy đủ thông tin hình ảnh.",
      });
    } else if (!images) {
      res.status(404).json({
        message: `Id ${imagesId} không tồn tại.`,
      });
    } else {
      const product = await Product.findByPk(id_product);

      if (!product) {
        return res.status(404).json({
          message: `Id sản phẩm ${id_product} không tồn tại.`,
        });
      }
      await images.update({
        url,
        name_img,
        id_product,
      });
      res.json({
        message: `Cập nhật hình ảnh id ${imagesId} thành công.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: `Lỗi cập nhật hình ảnh id ${imagesId}.`,
    });
  }
};

const deleteImagesById = async (req, res) => {
  const imagesId = req.params.id;
  try {
    const images = await Images.findByPk(imagesId);
    if (!images) {
      res.status(404).json({
        message: `không tìm thấy ${produimagesIdctId}.`,
      });
    } else {
      await images.destroy();
      res.json({
        message: `xóa id ${imagesId} thành công.`,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "lỗi trong quá trình xóa id " + imagesId,
    });
  }
};

module.exports = {
  getAllImages,
  addImages,
  updateImagestById,
  deleteImagesById,
};
