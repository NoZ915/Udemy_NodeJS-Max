const fs = require("fs");
const path = require("path");

module.exports = class Product{
    constructor(title){
        this.t = title;
    }

    save(){
        const p = path.join(path.dirname(require.main.filename), "data", "product.json");
        fs.readFile(p, (err, fileContent) => {
            let products = [];
            if(!err){
                products = JSON.parse(fileContent);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err);
            });
        })
    }

    static fetchAll(cb){
        const p = path.join(path.dirname(require.main.filename), "data", "product.json");
        fs.readFile(p, (err, fileContent) => {
            if(err){ //有err代表讀取不到p，可能是還未建立product.json
                cb([]);
            }
            cb(JSON.parse(fileContent));
        })
    }
}