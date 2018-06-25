'use strict';

import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    minlength: 10,
  },
  createdOn: {
    type: Date,
    default: () => new Date(),
  },
});

// Ran into a bug coding this, followed instructions on this stackoverflow page:
// https://stackoverflow.com/questions/50687592/jest-and-mongoose-jest-has-detected-opened-handles
// the first arg of mongoose.model is the name of your collection
const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('notes', noteSchema, 'notes', skipInit);

