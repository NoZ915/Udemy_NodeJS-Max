const fs = require('fs');
const path = require('path');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'cart.json'
);


module.exports = class Cart{
    static addProduct(id, productPrice){
        //Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = { products: [], totalPrice: 0 };
            if(!err){ //有err即尚未有東西在cart.json中
                cart = JSON.parse(fileContent);
            }

            //Analyze the cart => Find existing product
            const existingProduct = cart.products.find(prod => prod.id === id);
            let updatedProduct;
            //Add new product / Increase the quantity
            if(existingProduct){ //如果商品本來就存在，則對該商品數量加1
                updatedProduct = {...existingProduct};
                updatedProduct.qty = updatedProduct.qty + 1;
            }else{ //如果商品是新加入的，則增加新商品進入購物車
                updatedProduct = {id: id, qty: 1};
            }
            cart.totalPrice = cart.totalPrice + productPrice;
        })
    }
}