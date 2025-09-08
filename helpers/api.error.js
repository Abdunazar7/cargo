class ApiError extends Error {
    constructor (status, message) {
        super()
        this.message = message;
        this.status = status;
    }

    static badRequest(message){
        return new ApiError(404, message);
        
    }

    static Internal(message){
        return new ApiError(500, message);

    }

    static forbidden(message){
        return new ApiError(403, message);

    }

    static unAuthorized(message){
        return new ApiError(401, message);

    }
}

module.exports = ApiError
