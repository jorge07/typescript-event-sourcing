import { log } from 'util';

const ErrorHandling = (err, req, res, next) => {    
    res
       .status(err.status || err.code || 500)
       .json({
            message: err.message,
            error: err
        })
    ;
}

export default ErrorHandling;
