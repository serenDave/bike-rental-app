module.exports = (sendData, message) => {
    const responseObject = {
        status: 'success',
        data: { sendData }
    };
    
    if (message) {
        responseObject.message = message;
    }

    return responseObject;
};