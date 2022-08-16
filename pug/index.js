const express = require ('express');
const pug = require ('pug');
const app = express();
const {Container} = require ('./container');

app.use(express.urlencoded({extended: true}));
const PORT = 8080 || process.env.PORT;

const containerProducts = new Container('./data/products.txt');

app.set('view engine', 'pug');
app.set('views','./views');

app.get('/', async (req, res) => {
    const producto = await containerProducts.getAll();
    res.render('index', {
        list: producto,
        listExist: true,
        producto:true
    });
});

app.get('/productos', async (req, res) => {
    const producto = await containerProducts.getAll();
    res.render('partials/products', {
        list: producto,
        listExist: true,
        producto:true
    });
})


app.post("/productos", async (req, res) => {
    const producto = await req.body;
    containerProducts.save(producto);
    res.redirect("/productos")
});

app.listen(8080, err => {
    if(err) throw new Error (`Error on server: ${err}`);
    console.log(`Server is running on port: ${PORT}`);
})
