const swag = require('../models/swag');

module.exports = {
  add: (req, res, next) => {
    const { id } = req.query;
    if (id) {
      const isInCart = req.session.user.cart.find(item => item.id == id);
      if (isInCart) {
        res.status(200).send(req.session.user);
        next()
      } 
      const itemToAdd = swag.find( swag => swag.id == id );
      req.session.user.cart.push(itemToAdd);
      req.session.user.total += itemToAdd.price;
      res.status(200).send(req.session.user);
      next()
    }
  },
  delete: (req, res, next) => {
    const { id } = req.query;
    const { cart } = req.session.user
    const itemToDelete = swag.find(swag => swag.id == id);
    if(itemToDelete) {
      const i = cart.findIndex(swag => swag.id == id);
      cart.splice(i, 1);
      req.session.user.total -= itemToDelete.price;
    }
    res.status(200).send(req.session.user);
    next();
  },
  checkout: (req, res, next) => {
    const { user } = req.session;
    user.cart = [],
    user.total = 0

    res.status(200).send(req.session.user);
    next();
  }
}