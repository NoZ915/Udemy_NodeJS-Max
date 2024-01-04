const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const ObjectId = mongodb.ObjectId;

class User{
  constructor(username, email, cart, id){
    this.name = username;
    this.email = email;
    this.cart = cart ? cart : {};
    this._id = id;
    this.cart.items = cart ? cart.items : [];
  }

  save(){
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
  }

  addToCart(product){
    const cartProductIndex = this.cart.items.findIndex(cp => {
      return cp.productId.toString() === product._id.toString(); //若為true代表user購物車中已有該商品
    })
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];

    if(cartProductIndex >= 0){ //大於等於0代表有找到符合的商品
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    }else{ //若購物車上未有該商品，則將之push進陣列
      updatedCartItems.push({productId: new ObjectId(product._id), quantity: newQuantity})
    }

    const updatedCart = {items: updatedCartItems};

    const db = getDb(updatedCart);
    return db
      .collection("users")
      .updateOne({_id: new ObjectId(this._id)},{$set: {cart: updatedCart}})
  }

  getCart(){
    const db = getDb();
  }

  static findById(userId){
    const db = getDb();
    return db
      .collection("users")
      .findOne({_id: new ObjectId(userId)})
      .then(user => {
        console.log(`I find it: ${user._id}`)
        return user;
      })
      .catch(err => {
        console.log(err)
      });
  }
}

module.exports = User;