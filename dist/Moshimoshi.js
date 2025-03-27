var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { ContentType } from './entity/Types';
import { TokenType } from "./storage/TokenType";
import { Token } from "./entity/Token";
export class Moshimoshi {
    constructor(storage, loginEndpoint, refreshEndpoint, logoutEndpoint) {
        this.num = 0;
        this.instance = axios.create();
        this.storage = storage;
        this.loginEndpoint = loginEndpoint;
        this.refreshEndpoint = refreshEndpoint;
        this.logoutEndpoint = logoutEndpoint;
        this.instance.interceptors.request.use((value) => {
            console.log(`${value.method} ${value.url}`);
            console.log('Headers:', value.headers);
            console.log('Cuerpo:', value.data);
            return value;
        });
        this.instance.interceptors.response.use((response) => response, (error) => this.handleResponseError(error));
    }
    static getInstance(storage, loginEndpoint, refreshEndpoint) {
        if (!Moshimoshi.instance) {
            Moshimoshi.instance = new Moshimoshi(storage, loginEndpoint, refreshEndpoint);
        }
        return Moshimoshi.instance;
    }
    handleResponseError(error) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (error.response && error.response.status === 401) {
                console.warn('Token expirado: Intentando renovar el token');
                yield this.refreshToken();
                const accessToken = (_a = this.storage.retrieve(TokenType.ACCESS)) === null || _a === void 0 ? void 0 : _a.value;
                if (accessToken) {
                    error.config.headers['Authorization'] = `Bearer ${accessToken}`;
                    return this.instance.request(error.config);
                }
                else {
                    window.location.href = '/login';
                }
            }
            return Promise.reject(error);
        });
    }
    loadAuthorized(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Llamada ejecutada");
            this.num = this.num + 1;
            console.log(this.num);
            let config = this.buildRequest(endpoint);
            config = yield this.authenticate(config);
            console.log("Autenticado");
            try {
                const response = yield this.instance(config);
                console.log('Response:', response.data);
                return response.data;
            }
            catch (error) {
                console.error('API call error:', error);
                throw error;
            }
        });
    }
    load(endpoint) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = this.buildRequest(endpoint);
            try {
                const response = yield this.instance(config);
                console.log('Response:', response.data);
                return response.data;
            }
            catch (error) {
                console.error('API call error:', error);
                throw error;
            }
        });
    }
    login(data) {
        return __awaiter(this, void 0, void 0, function* () {
            this.loginEndpoint.body = Object.assign(Object.assign({}, this.loginEndpoint.body), data);
            try {
                const response = yield this.load(this.loginEndpoint);
                const { access_token, refresh_token, expires_in } = response;
                const accessToken = new Token(access_token, expires_in);
                const refreshToken = new Token(refresh_token, null);
                this.storage.save(accessToken, TokenType.ACCESS);
                this.storage.save(refreshToken, TokenType.REFRESH);
            }
            catch (error) {
                console.error('API call error:', error);
                throw error;
            }
        });
    }
    authenticate(config) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.getAccessToken();
            config.headers = Object.assign(Object.assign({}, config.headers), { Authorization: `Bearer ${token}` });
            return config;
        });
    }
    buildURL(endpoint) {
        let path = endpoint.path;
        for (const [key, value] of Object.entries(endpoint.parameters)) {
            path = path.replace(`:${key}`, encodeURIComponent(value));
        }
        return `${path}`;
    }
    buildRequest(endpoint) {
        const url = this.buildURL(endpoint);
        const config = {
            method: endpoint.httpMethod,
            url,
            headers: Object.assign({ 'Content-Type': endpoint.contentType || ContentType.JSON }, endpoint.headers),
            params: endpoint.query,
        };
        if (endpoint.body) {
            config.data = endpoint.body;
        }
        return config;
    }
    getAccessToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accessToken = this.storage.retrieve(TokenType.ACCESS);
                if (accessToken) {
                    if (accessToken.isValid) {
                        return accessToken.value;
                    }
                    else {
                        const refreshToken = this.storage.retrieve(TokenType.REFRESH);
                        if (refreshToken) {
                            yield this.refreshToken();
                            return yield this.getAccessToken();
                        }
                        else {
                            this.logout();
                        }
                    }
                }
                return accessToken === null || accessToken === void 0 ? void 0 : accessToken.value;
            }
            catch (error) {
                return undefined;
            }
        });
    }
    refreshToken() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            this.refreshEndpoint.body = Object.assign(Object.assign({}, this.refreshEndpoint.body), { refreshToken: (_a = this.storage.retrieve(TokenType.REFRESH)) === null || _a === void 0 ? void 0 : _a.value });
            try {
                const response = yield this.load(this.refreshEndpoint);
                const { access_token, refresh_token, expires_in } = response.data;
                const accessToken = new Token(access_token, expires_in);
                const refreshToken = new Token(refresh_token, null);
                this.storage.save(accessToken, TokenType.ACCESS);
                this.storage.save(refreshToken, TokenType.REFRESH);
            }
            catch (error) {
                console.error('API call error:', error);
                throw error;
            }
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.logoutEndpoint) {
                yield this.load(this.logoutEndpoint);
            }
            this.storage.deleteAll();
            window.location.href = '/login';
        });
    }
}
