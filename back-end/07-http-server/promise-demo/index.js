// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
// Promises: represents the eventual completion or failure of an async operation, and its resulting value, it is PROXY for a value not necessarily known or when the promise is created
// Promises: they go through a process that ends up with a resolution or rejection. If resolved, the promise returns a value (or just returns undefined). If returning a value, we handle that value in a "then" block. If rejected, returns our error that we handle in a catch block
const fs = require('fs');

const readFilePromise = () => {
  return new Promise((resolve, reject) => {
    return fs.readFile(`${__dirname}/assets/data.txt`, (err, data) => {
      if (err) return reject(err);
      return resolve(data.toString());
    })
  })
}

const writeFilePromise = (data) => {
  const newData = `${data} THIS IS NEW DATA AFTER A PROMISE`;
  return new Promise((resolve, reject) => {
    return fs.writeFile(`${__dirname}/assets/newPromiseData.txt`, newData, (err) => {
      if (err) return reject(err);
      return resolve('FILE SAVED!');
    })
  })
}

readFilePromise()
  .then(oldText => {
    return writeFilePromise(oldText)
  })
  .then(foo => {
    console.log(foo, 'first message');
  })
  // .then(sucessMessageAgain => {
  //   console.log(sucessMessageAgain, 'again');
  // })
  .catch(err => {
    console.log(err);
  })

const readFileCallback = () => {
  return fs.readFile(`${__dirname}/assets/data.txt`, (err, data) => {
    if (err) throw err;

    const newData = `${data} THIS IS NEW TEXT`;

    return fs.writeFile(`${__dirname}/assets/newData.txt`, newData, (err) => {
      if (err) throw err;
      // do anything you want here
      console.log('file saved!');
    })
  })
}

// readFileCallback();