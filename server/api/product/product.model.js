var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schema Product
var productSchema = new Schema({
    name: {
	type: String 
    },
    description: {
	type: String
    },
    price: {
	type: Number
    },
    quantity_description: {
	type: String
    },
    kind: {
	type: Number
    },
    picture: {
	type: String
    } 
});

module.exports = mongoose.model('Product', productSchema);