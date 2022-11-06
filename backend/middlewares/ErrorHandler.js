const { NODE_ENV } = process.env;

const ErrorHandler = (error, req, res, next) => {
    // console.log(error.message.bold.red);
    // console.log(res.statusCode);
    // console.log(error.stack.bold.magenta);
    const statusCode = res.statusCode ? res.statusCode : 500;  
    const stack = NODE_ENV === "production" ? null : error.stack

    res.status(statusCode);
    // stack - позволяет отобразить информацию по ошибке в Postman
    res.json({message: error.message, stack})
}


module.exports = ErrorHandler;