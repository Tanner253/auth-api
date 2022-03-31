'use strict';

/*
  In this example, we directly export an anonymous function

  NOTE: this one has 4 parameters, which means Express knows intrinsically that it is for handling server errors

  Because we'll be building out an API that works with JSON, let's format
  our response as a JSON object
*/

// function handle404(req, res, next) {

//   const errorObject = {
//     status: 404,
//     message: 'Sorry, we could not find what you were looking for'
//   };

//   res.status(404).json(errorObject);
// }

// module.exports = handle404;

module.exports = function (err, req, res, next) {
  try{
    // Sometimes, errors come in as an object, others as a string
    const error = err.message ? err.message : err;
    const errorObject = {
      status: 500,
      message: error
    };
    res.status(500).json(errorObject);
  }catch(e){
    console.log(e);
    return e;
  }
};
