const express = require('express');
const app = express();
const {Container} = require("./container");

app.use (express.urlencoded({extended: true}));

const PORT = process.env.PORT || 8080;

const container = new Container('./data/products.txt');

app.set ('view engine', 'ejs');
app.set ('views', "./views");

app.use (express.static('public'));

app.get ('/', async (req, res) => {
    const products = await container.getAll()
    res.render ('index', {
        listExist: true,
        list: products,
        products: true
    })
});

app.get ('/productos', async (req, res) =>{
    const products = await container.getAll();
    res.render ('partials/products', {
        listExist: true,
        list: products,
        products: true
    })
});

app.post ('/productos', async (req, res) => {
    const products = req.body;
    container.save(products);
    res.redirect('/productos');
});

app.listen (PORT, err => {
    if (err) throw new Error (`Error on server: ${err}`);
    console.log (`Server is running on port: ${PORT}`);
})