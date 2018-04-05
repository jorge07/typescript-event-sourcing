import { Response, Request } from 'express';

const ErrorHandling = (err: any, req: Request, res: Response) => {
    
    if (err.message) {
        res
            .json({
                message: err.message,
                error: err
            })
            .status(err.status || err.code || 500)
        ;
    }
};

export default ErrorHandling;
