'use strict';

import mongoose from 'mongoose';
require('mongoose-schema-jsonschema')(mongoose);
// import categories from "./categories";

// let cats = await categories.find({});

const products = mongoose.Schema({
  name: { type:String, required:true },
  description: { type:String },
  price: { type:Number, required:true },
  category: { type:String, required:true }
});

export default mongoose.model('products', products);
