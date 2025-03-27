import { Token } from './Token';
export declare class Tokens {
    accessToken: Token;
    refreshToken: Token;
    constructor(accessToken: Token, refreshToken: Token);
    get isAccessTokenValid(): boolean;
    get isRefreshTokenValid(): boolean;
}
