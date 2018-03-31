const ErrorHandling = (err, req, res) => {
    console.log(err);
    res
       .status(err.status || err.code || 500)
       .json({
            message: err.message,
            error: err
        })
    ;
};

export default ErrorHandling;
