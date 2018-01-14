/**
* A basic Hello World function
* @param {buffer} data
* @returns {any}
*/
module.exports = (data, context, callback) => {
  console.log(data)
  callback(null, data);

};
