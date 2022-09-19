exports._Response = (res, status, code,message, data ,error) => {

    const resData = {
        status:status,
        code:code,
        message:message,
        data: data,
        error_message:error ? `${error}` : undefined
    };
    return res.status(code).json(resData)
     
}



