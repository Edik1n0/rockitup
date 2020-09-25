const mongoose = require ('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema ({
    producto: { type: String, required: true },
    valor: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', ProductSchema)