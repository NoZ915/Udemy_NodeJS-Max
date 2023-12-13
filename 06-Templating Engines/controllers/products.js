const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
    res.render("add-product", {
        pageTitle: "Add Product",
        path: "/admin/add-product"
    })
}

exports.postAddProduct = (req, res, next) => {
    const product = new Product(req.body.title); //送出表單 > 發送POST request > 建立Product實例
    product.save(); // save()會把this（也就是自己，product）推進products陣列中
    res.redirect('/');
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("shop", {
            prods: products,
            pageTitle: "shop", path: "/"
        });
    });
}