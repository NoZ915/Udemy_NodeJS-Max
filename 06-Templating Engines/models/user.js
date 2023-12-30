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
    const updatedCart = {items:[{...product, quantity: 1}]};
    const db = getDb(updatedCart);
    return db
      .collection("users")
      .updateOne({_id: new ObjectId(this._id)},{$set: {cart: updatedCart}})

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