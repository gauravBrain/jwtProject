function adminLoginResponse(params, jwt) {
    var respObj = {
        "message": "Successfully Logged in.",
        "accessToken": jwt,
        "adminProfile": {
            "_id": params._id,
            "name" : params.name,
            "email": params.email
        }
    }
    return respObj;
}

function logoutResponse(){
    let respObj = {
        "message": "Successfully Logged out.",
    }
    return respObj;
}

module.exports = {
    adminLoginResponse,
    logoutResponse
}
