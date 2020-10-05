const getCategories = require('./get-categories');

class categories {
  async find(req, res) {
    await getCategories(req, res);
  }
}

module.exports = categories;
