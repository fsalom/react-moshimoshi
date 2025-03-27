export declare class Token {
    value: string;
    expireDate: Date | null;
    expireInt: number | null;
    constructor(value: string, expireInt: number | null);
    get isValid(): boolean;
    private parseDate;
}
