const express = require('express');
const { getAllImages, addImages, updateImagestById, deleteImagesById } = require("../controllers/ImagesController");
const routerImages = express.Router();

routerImages.get('/api/getAllImages', getAllImages);
routerImages.post('/api/addImages', addImages);
routerImages.put('/api/updateImagestById/:id', updateImagestById);
routerImages.delete('/api/deleteImagesById/:id', deleteImagesById);


module.exports = {
    routerImages
}