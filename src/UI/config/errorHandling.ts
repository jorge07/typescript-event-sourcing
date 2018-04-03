const ErrorHandling = (err, req, res) => {
    res
       .status(err.status || err.code || 500)
       .json({
            message: err.message,
            error: err
        })
    ;
};

export default ErrorHandling;
