export const TOKEN_AUTH_CREATE      = "api_token_auth";

export const USERS_LIST             = "api_v1_users_list";
export const USERS_CREATE           = "api_v1_users_create";
export const USERS_READ             = "api_v1_users_read";
export const USERS_UPDATE           = "api_v1_users_update";
export const USERS_PARTIAL_UPDATE   = "api_v1_users_partial-update";
export const USERS_DELETE           = "api_v1_users_delete";


function Endpoint({uri, method, ...rest}) {
    return {
        uri,
        method,
        ...rest,

        formattedUri: function({...args}) {
            let uri = this.uri
            for(const [key, value] of Object.entries(args)) {
                uri = uri.replace(`:${key}`, value)
            }
            return {
                ...this,
                uri
            }
        }
    }
}

const ENDPOINTS = {
    [TOKEN_AUTH_CREATE]: Endpoint({
        uri: "/api-token-auth/",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    }),

    [USERS_LIST]: Endpoint({
        uri: "/api/v1/users/",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }),

    [USERS_CREATE]: Endpoint({
        uri: "/api/v1/users/",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }),

    [USERS_READ]: Endpoint({
        uri: "/api/v1/users/:id/",
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }),

    [USERS_UPDATE]: Endpoint({
        uri: "/api/v1/users/:id/",
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        }
    }),

    [USERS_PARTIAL_UPDATE]: Endpoint({
        uri: "/api/v1/users/:id/",
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }
    }),

    [USERS_DELETE]: Endpoint({
        uri: "/api/v1/users/:id",
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }),
}

export default ENDPOINTS