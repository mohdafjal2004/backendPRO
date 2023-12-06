
//* A wrapper function that we will use everywhere
// Method 1
const asyncHandler = (requestHandler) => {
    (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

//* A wrapper function that we will use everywhere
// Method 2
// const asyncHandler = async (req, res, next) => {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
// const asyncHandler = (func) => {async () => {}}
