var express = require('express');

var routes = function (Product) {
    var productRouter = express.Router();

    productRouter.route('/Products')
        .post(function (req, res) {
            var product = new Product(req.body);
            product.save();
            res.status(201).send(product);
        })
        .get(function (req, res) {
            Product.find(function (err, products) {
                if (err) res.status(500).send(err);
                else res.json(products);
            });
        });
    // Middleware 
    productRouter.use('/Products/:productId', function (req, res, next) {
        Product.findById(req.params.productId, function (err, product) {
            if (err) res.status(500).send(err);
            else if (product) {
                req.product = product;
                next();
            } else {
                res.status(404).send('product not found!!');
            }
        });
    });

    productRouter.route('/Products/:productId')
        .get(function (req, res) {
            res.json(req.product);
        })
        .put(function (req, res) {
            req.product.productName = req.body.productName;
            req.product.productCode = req.body.productCode;
            req.product.category = req.body.category;
            req.product.brand = req.body.brand;
            req.product.sku = req.body.sku;
            req.product.resolution = req.body.resolution;
            req.product.type = req.body.type;
            req.product.technology = req.body.technology;
            req.product.series = req.body.series;
            req.product.description = req.body.description;
            req.product.price = req.body.price;
            req.product.discount = req.body.discount;
            req.product.imageUrl = req.body.imageUrl;
            req.product.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.product);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }
            for (var key in req.body) {
                req.product[key] = req.body[key];
            }
            req.product.save(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.json(req.product);
                }
            });
        })
        .delete(function (req, res) {
            req.product.remove(function (err) {
                if (err)
                    res.status(500).send(err);
                else {
                    res.status(204).send('REMOVED PRODUCT');
                }
            });
        });
    return productRouter;
};

module.exports = routes;