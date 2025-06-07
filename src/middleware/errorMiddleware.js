export const errorHandler = async (err, req, res, next) => {

    //Logs the stack trace (so you can see where the error came from in the code).
    console.error(err.stack);

    // If the response status is still 200 (which means no error status was set), then we’ll force it to be 500 (Internal Server Error). Otherwise, keep whatever error status was already set.
    // If res.statusCode === 200: use 500, else: use res.statusCode as-is.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    // If we are in production, hide the stack trace (just show a sad emoji). Otherwise, show the full error stack trace.
    // Because in production, you don’t want to leak internal paths, filenames, or server code to users — it’s a security risk. So we show something neutral (even an emoji), or just omit it.
    // If NODE_ENV === 'production': stack: sad emoji (for users), else: stack: err.stack (so we can debug)
    res.status(statusCode).json({
        message: err.message || 'Something went wrong!',
        stack: process.env.NODE_ENV === 'production' ? '🥲' : err.stack,
    });
};