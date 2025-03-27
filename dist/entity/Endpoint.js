import { ContentType } from "./Types";
export class Endpoint {
    constructor(config) {
        this.baseURL = '';
        this.parameters = {};
        this.query = {};
        this.path = config.path;
        this.httpMethod = config.httpMethod;
        this.contentType = config.contentType || ContentType.JSON;
        this.parameters = config.parameters || {};
        this.headers = config.headers || {};
        this.body = config.body;
        this.query = config.query || {};
    }
}
