import { TokenType } from "../TokenType";
import { Token } from "../../entity/Token";
export default class LocalStorageImpl {
    retrieve(type) {
        let storedToken = null;
        switch (type) {
            case TokenType.ACCESS:
                storedToken = localStorage.getItem(TokenType.ACCESS);
                break;
            case TokenType.REFRESH:
                storedToken = localStorage.getItem(TokenType.REFRESH);
                break;
        }
        if (storedToken) {
            const tokenData = JSON.parse(storedToken);
            return new Token(tokenData.value, tokenData.expireInt);
        }
        return null;
    }
    save(token, type) {
        localStorage.setItem(type, JSON.stringify(token));
    }
    deleteAll() {
        localStorage.removeItem(TokenType.ACCESS);
        localStorage.removeItem(TokenType.REFRESH);
    }
}
