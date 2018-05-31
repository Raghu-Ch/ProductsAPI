var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productModel = new Schema({
    productName: String,
    productCode: String,
    category: String,
    brand: String,
    sku: String,
    resolution: String,
    type: String,
    technology: String,
    series: String,
    description: String,
    price: Number,
    discount: String,
    imageUrl: String
});

module.exports = mongoose.model('Product', productModel);