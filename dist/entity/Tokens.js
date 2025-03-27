export class Tokens {
    constructor(accessToken, refreshToken) {
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    get isAccessTokenValid() {
        return this.accessToken.isValid;
    }
    get isRefreshTokenValid() {
        return this.refreshToken.isValid;
    }
}
