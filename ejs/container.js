const fs = require('fs');

class Container {
    constructor (name){
        this.name = name
    }
    async save(items) {
        try {
            const content = await fs.promises.readFile(this.name, 'utf8');
            const contentObj = JSON.parse(content);
            contentObj.push({
                title: items.title, 
                price: items.price,
                image: items.image,
                id: contentObj.length + 1
            });
            await fs.promises.writeFile(this.name, JSON.stringify(contentObj, null, 2));
            console.log(`El N° de ID asignado es: ${contentObj.length}`)
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async getById(number) {
        try {
            const content = await fs.promises.readFile(this.name, 'utf8');
            const contentObj = JSON.parse(content);
            const getId = contentObj.find(num=> num.id === parseInt(number));
            if (getId != undefined) {
                console.log(getId)
            } else {
                console.log(null)
            }
             
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async getAll() {
        try {
            const content = await fs.promises.readFile(this.name, 'utf8');
            const contentObj = JSON.parse(content);
            console.log('Show all products');
            //console.log(contentObj);
            return contentObj;
        }
        catch(err) {
            console.log(err.message);
        }
        
    }

    async deleteById(id) {
        try {
            const content = await fs.promises.readFile(this.name, 'utf8');
            const contentObj = JSON.parse(content);
            let object = contentObj.find(num=> num.id === parseInt(id))
            contentObj.splice(contentObj.indexOf(object), 1)
            await fs.promises.writeFile(this.name, JSON.stringify(contentObj, null, 2));
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async deleteAll() {
        try {
            const content = await fs.promises.writeFile(this.name, JSON.stringify([], null, 2));
            console.log('Productos borrados con exito!');
        }
        catch(err) {
            console.log(err.message);
        }
    }

}

const products = new Container ('./products.txt');

//console.log(products.save({'title': 'libro', 'price': 150.90}));

//products.getById(2);

//products.getAll();

//products.deleteById(102)

//products.deleteAll();

module.exports = {Container};