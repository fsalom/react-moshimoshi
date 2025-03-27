import { ContentType, HTTPMethod } from "./Types";
interface EndpointConfig {
    path: string;
    httpMethod: HTTPMethod;
    contentType?: ContentType;
    body?: any;
    parameters?: Record<string, any>;
    headers?: Record<string, string>;
    query?: Record<string, any>;
}
export declare class Endpoint {
    baseURL: string;
    path: string;
    httpMethod: HTTPMethod;
    contentType?: ContentType;
    body?: any;
    parameters: Record<string, any>;
    query: Record<string, any>;
    headers: Record<string, string>;
    constructor(config: EndpointConfig);
}
export {};
