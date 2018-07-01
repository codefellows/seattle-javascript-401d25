'use strict';

import mongoose from 'mongoose';
// MongoDB is nonrelational, NoSQL databse
// validation purposes
const classRoomSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'students',
    },
  ],
  teacher: {
    type: String,
    default: 'Judy',
    enum: ['Judy', 'Vinicio', 'Allie', 'Same'],
  },
}, { timestamps: true });

classRoomSchema.pre('findOne', function preHookCallback(done) {
  this.populate('students');
  done();
});

const skipInit = process.env.NODE_ENV === 'development';
export default mongoose.model('classrooms', classRoomSchema, 'classrooms', skipInit);

