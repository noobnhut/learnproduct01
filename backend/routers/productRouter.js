const express =require("express") ;
const {
    getAllProduct, addProduct, updateProductById, deleteProductById, getProductById
 
} =require("../controllers/productController.js") ;
const routerProduct = express.Router();

routerProduct.post('/api/addProduct', addProduct);
routerProduct.put('/api/updateProductById/:id', updateProductById);
routerProduct.get('/api/getAllProduct', getAllProduct);
routerProduct.get('/api/getProductById/:id', getProductById)
routerProduct.delete('/api/deleteProductById/:id', deleteProductById);


module.exports = {
    routerProduct
}