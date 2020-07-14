const express = require('express')
const routes = express.Router()
const ProductController = require('./app/controllers/ProductController')
const multer = require('../src/app/middlewares/multer')

routes.get("/", function(req, res) {
    return res.render('layout')
})

routes.get("/products/create", ProductController.create)
routes.get("/products/:id/edit", ProductController.edit)

routes.post("/products", multer.array("photos", 6), ProductController.post)
routes.put("/products", multer.array("photos", 6), ProductController.put)
routes.delete("/products", ProductController.delete)


// Alias
routes.get("/ads/create", function(req, res) {
    return res.redirect("/products/create")
})

module.exports = routes
