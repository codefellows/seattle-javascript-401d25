'use strict';

const teachers = [
  { first: 'Judy', last: 'Vue' },
  { first: 'Vincio', last: 'Sanchez' },
  { first: 'Allie', last: 'Grampa' },
  { first: 'Sam', last: 'Hamm' },
  { first: 'John', last: 'Cokos' },
];

// imperative manner
let teacherFirstNames = [];
for (let i = 0; i < teachers.length; i++) {
  teacherFirstNames[i] = teachers[i].first;
}

// declarative manner
// teacherFirstNames = teachers.map(teacher => teacher.first);

teacherFirstNames = teachers.map((teacher) => {
  return teacher.first;
});
console.log(teacherFirstNames, 'AFTER MAP FUNCTION');
