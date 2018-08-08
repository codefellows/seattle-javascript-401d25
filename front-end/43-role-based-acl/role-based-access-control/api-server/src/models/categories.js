'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

// import products from './products.js';

const categories = mongoose.Schema({
  name: {type:String, require:true},
}, { toJSON: { virtuals: true } });

categories.virtual('products', {
  ref: 'products',
  localField: 'name',
  foreignField: 'category',
  justOne:false,
});

categories.pre('findOne', function() {
  try {
    this.populate('products');
  }
  catch(e) {
    console.error('ERR', e);
  }
});

export default mongoose.model('categories', categories);

