'use strict';

import mongoose from 'mongoose';
import Classroom from './classroom';


const studentSchema = mongoose.Schema({
  first: {
    type: String,
    required: true,
  },
  last: {
    type: String,
    required: true,
  },
  favoriteCodingLanguage: {
    type: String,
    default: 'Javascript',
    enum: ['Javascript', 'Python', 'C#', 'Java'],
  },
  classRoomId: { 
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'classrooms',
  },
}, { timestamps: true });

const skipInit = process.env.NODE_ENV === 'development';


export default mongoose.model('students', studentSchema, 'students', skipInit);

function studentPreHook(done) {
  // done is using an (error,data) signature
  // the value of 'contextual this' is the document
  return Classroom.findById(this.classRoomId)
    .then((foundClassroom) => {
      foundClassroom.students.push(this._id);
      return foundClassroom.save();
    })
    .then(() => done()) // done without any arguments mean success - save
    .catch(done); // done with results means an error - do not save
}

const studentPostHook = (document, done) => {
  // document refers to the current instance of this student schema
  return Classroom.findById(document.classRoomId)
    .then((foundClassoom) => {
      foundClassoom.students = foundClassoom.students.filter(student => student._id.toString() !== document._id.toString());
      return foundClassoom.save();
    })
    .then(() => done())
    .catch(done);
};

studentSchema.pre('save', studentPreHook);
studentSchema.post('remove', studentPostHook);

