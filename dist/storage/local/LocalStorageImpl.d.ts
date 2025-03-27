import { Storage } from "../Storage";
import { TokenType } from "../TokenType";
import { Token } from "../../entity/Token";
export default class LocalStorageImpl implements Storage {
    retrieve(type: TokenType): Token | null;
    save(token: Token, type: TokenType): void;
    deleteAll(): void;
}
