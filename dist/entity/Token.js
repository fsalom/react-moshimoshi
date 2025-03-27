export class Token {
    constructor(value, expireInt) {
        this.value = value;
        this.expireInt = expireInt;
        this.expireDate = this.parseDate(expireInt);
    }
    get isValid() {
        return this.expireDate !== null && this.expireDate > new Date();
    }
    parseDate(value) {
        if (!value) {
            return new Date(Date.now() + 31540000 * 1000); // 1 año en segundos
        }
        return new Date(Date.now() + value * 1000);
    }
}
