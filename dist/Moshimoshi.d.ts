import { AxiosInstance } from 'axios';
import { Endpoint } from './entity/Endpoint';
import { Storage } from './storage/Storage';
export declare class Moshimoshi {
    instance: AxiosInstance;
    private storage;
    private loginEndpoint;
    private refreshEndpoint;
    private logoutEndpoint?;
    num: number;
    private static instance;
    private constructor();
    static getInstance(storage: Storage, loginEndpoint: Endpoint, refreshEndpoint: Endpoint): Moshimoshi;
    private handleResponseError;
    loadAuthorized(endpoint: Endpoint): Promise<any>;
    load(endpoint: Endpoint): Promise<any>;
    login(data: any): Promise<void>;
    private authenticate;
    private buildURL;
    private buildRequest;
    getAccessToken(): Promise<string | undefined>;
    private refreshToken;
    logout(): Promise<void>;
}
