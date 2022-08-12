const express = require('express');
const handlebars = require("express-handlebars");
const app = express();
const {Container} = require('./container')


app.use(express.urlencoded({ extended: true }))
const PORT = 5000 || process.env.PORT;


const containerProducts = new Container('./data/products.txt')

app.set("view engine", "hbs");
app.set("views", "./views/layouts");

app.use(express.static("public"));

app.engine(
	"hbs",
	handlebars.engine({
		extname: ".hbs",
		defaultLayout: "index.hbs",
		layoutsDir: __dirname + "/views/layouts",
		partialsDir: __dirname + "/views/partials"
	})
);

app.get("/", async (req, res) => {
	const producto = await containerProducts.getAll();
	res.render("products", {
		list: producto,
		listExist: true,
		producto: true
	});
});



app.listen(5000, err => {
    if(err) throw new Error (`Error on server: ${err}`);
    console.log(`Server is running on port: ${PORT}`);
})
