import ENDPOINTS from "./endpoints"

const BASE_URL = "http://emphasoft-test-assignment.herokuapp.com";

class Api {
    constructor(baseUrl, endpoints) {
        this.baseUrl = baseUrl;
        this.endpoints = endpoints;
        this.common = {
            headers: {}
        }
    }

    async createRequest(endpoint, subpages, data) {
        const {method, headers, uri} = this.endpoints[endpoint].formattedUri(subpages);

        return fetch(`${this.baseUrl}${uri}`, {
            method,
            body: JSON.stringify(data),
            headers: {...headers, ...this.common.headers}
        });
    }

    async fetch({endpoint, subpages = {}, data = undefined}) {
        const response = await this.createRequest(endpoint, subpages, data);
        if (response.ok) {
            return response.json();
        }

        const error = await response.json();
        throw error
    }
}

export default new Api(BASE_URL, ENDPOINTS)