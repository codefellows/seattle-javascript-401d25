'use strict';

// use strict prevents variables with no let/const/var in front of it get attached to the global scope

// Scope: a set of rules that defines where and how variables can be looked up
const b = 2;

// Line 7 is equivalent to what's going on here in lines 10-11
// const b;
// b = 2;

// Closure: the combination of a function and the lexical environment within which that function was declared. 

const a = 2;

const add = (a, b) => a + b;

const foodBugetAdder = (midMorningSnack) => {
  const bagels = 10;
  let coffee = 5;

  const breakfastFoodPrice = (price) => {
    coffee = 2;
    return price + bagels;
  };

  const doughnut = breakfastFoodPrice(20);

  /*eslint-disable*/
  // CURRYING: refers to the process of taking a function with n arguments and transforming it into n functions that each take a single argument. It essentially creates a chain of partially applied functions that eventually resolves with a value.
  // PARTIAL APPLICATION: almost the same thing, except the returned function can take <1 argument

  return function (anotherFoodPrice) {
    return `I spent ${anotherFoodPrice + coffee + doughnut + midMorningSnack} dollars on food today.`
  }
  // return anotherFoodPrice => `I spent ${anotherFoodPrice + coffee + doughnut + midMorningSnack} dollars on food today`;
};


const initialFood = foodBugetAdder(2)
console.log(initialFood);
console.log(initialFood(6));
