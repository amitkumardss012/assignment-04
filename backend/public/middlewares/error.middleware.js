export const errorMiddleware = (err, req, res, next) => {
    err.message ||= "Internal Server Error";
    err.statusCode ||= 500;
    if ("code" in err && err.code === "P2025") {
        err.message = "Item not found";
    }
    // Final Error Response
    return res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};
export default errorMiddleware;
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
//# sourceMappingURL=error.middleware.js.map