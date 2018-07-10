const sampleArray = [1, 2, 3];

const recursiveArrayAddition = (array) => {
  // 1 - preform validations and error checks
  // 2 - call the recursive function

  // TODO: ADD VALIDATION

  // Vinicio - In recursion, you always have to keep track of the return values
  return _recursiveArrayAddition(array, 0, 0);
};

//------------------------------------------------------------------
// APPROACH 1 - HEAD/TAIL BASED
//------------------------------------------------------------------
const _recursiveArrayAddition = (array, index, sum) => {
  if (index === array.length - 1) {
    return array[index] + sum;
  }
  return _recursiveArrayAddition(array, index + 1, sum + array[index]);
};

console.log(recursiveArrayAddition(sampleArray));
//------------------------------------------------------------------
// APPROACH 1 - HEAD/TAIL BASED
//------------------------------------------------------------------
// const _recursiveArrayAddition = (array, index) => {
//   // Vinicio - Base Case
//   if (index === array.length - 1) {
//     // Vinicio - I'm about to process the last element
//     return array[index];
//   }
//   // Vinicio - Head-based because the recursive call is NOT the last line
//   // const intermediateValue = array[index] + _recursiveArrayAddition(array,
//   //   index + 1);
//   // Vinicio - A LOT MORE PROCESSING
//   // return intermediateValue;
//
//   // Vinicio- Tail-based recursion
//   return array[index] + _recursiveArrayAddition(array, index + 1);
// };
//------------------------------------------------------------------
