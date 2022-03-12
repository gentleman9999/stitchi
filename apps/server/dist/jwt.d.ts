export interface Payload {
    [key: string]: any;
    iss?: string | undefined;
    sub?: string | undefined;
    aud?: string | string[] | undefined;
    exp?: number | undefined;
    nbf?: number | undefined;
    iat?: number | undefined;
    jti?: string | undefined;
}
export declare function verify(authHeader: string): Promise<Payload | undefined>;
//# sourceMappingURL=jwt.d.ts.map