// handles our asynchronous operations and acts as a try/catch block so we don't need to write try/catch in every async operation we do
const asyncHandler = fn => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next)
}

module.exports = asyncHandler