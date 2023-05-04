type Code =
    | "EMPTY"
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CREATED"
    | "DELETED"
    | "VALID"
    | "CHANGED"
    | "CONTENT"
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "BAD_OPTION"
    | "FORBIDDEN"
    | "NOT_FOUND"
    | "METHOD_NOT_ALLOWED"
    | "NOT_ACCEPTABLE"
    | "REQUEST_ENTITY_INCOMPLETE"
    | "PRECONDITION_FAILED"
    | "REQUEST_ENTITY_TOO_LARGE"
    | "UNSUPPORTED_CONTENT_FORMAT"
    | "INTERNAL_SERVER_ERROR"
    | "NOT_IMPLEMENTED"
    | "BAD_GATEWAY"
    | "SERVICE_UNAVAILABLE"
    | "GATEWAY_TIMEOUT"
    | "PROXYING_NOT_SUPPORTED";

type Type = "CON" | "NON" | "ACK" | "RST";

type Option =
    | "IF_MATCH"
    | "URI_HOST"
    | "ETAG"
    | "IF_NONE_MATCH"
    | "OBSERVE"
    | "URI_PORT"
    | "LOCATION_PATH"
    | "URI_PATH"
    | "CONTENT_FORMAT"
    | "MAX_AGE"
    | "URI_QUERY"
    | "ACCEPT"
    | "LOCATION_QUERY"
    | "BLOCK2"
    | "BLOCK1"
    | "SIZE2"
    | "PROXY_URI"
    | "PROXY_SCHEME"
    | "SIZE1";

declare module "@eight/h5.coap/lib/Option" {
    class Option {
        constructor(number: number, data: Buffer | null);
    }

    export = Option;
}

declare module "@eight/h5.coap" {
    import OptionObj = require("@eight/h5.coap/lib/Option");

    interface CodeDefinition {
        code: number;
        name: string;
        description: string;
        isRequest(): boolean;
        isResponse(): boolean;
        isSuccess(): boolean;
        isClientError(): boolean;
        isServerError(): boolean;
    }

    interface MessageParams {
        type: Type;
        code: Code;
        id: number;
        token: Buffer;
        payload: Buffer;
        // * @param {object} [obj.block1]
        // * @param {object} [obj.block2]
        uri: string;
        uriHost: string;
        uriPort: string;
        uriPath: string;
        uriQuery: string;
        locationPath: string;
        locationQuery: string;
        ifMatch: Buffer | string;
        ifNoneMatch: boolean;
        eTag: Buffer | string;
        contentFormat: number | string;
        accept: number | string;
        maxAge: number;
        proxyUri: string;
        proxyScheme: string;
    }

    class Message {
        addOption(option: OptionObj): void;
        getCode(): number;
        getCodeDefinition(): CodeDefinition;
        getId(): number;
        getMaxAge(): number;
        getPayload(): Buffer;
        getPayloadLength(): number;
        getTimestamp(): number;
        getToken(): Buffer;
        getTokenLength(): number;
        getTokenString(): string;
        getTypeString(): string;
        getUriPath(): string;
        getUriQuery(): string;
        isAcknowledgement(): boolean;
        isClientError(): boolean;
        isConfirmable(): boolean;
        isEmpty(): boolean;
        isEmptyAcknowledgement(): boolean;
        isNonConfirmable(): boolean;
        isReply(): boolean;
        isResponse(): boolean;
        isRequest(): boolean;
        isReset(): boolean;
        isServerError(): boolean;
        isSuccess(): boolean;
        setCode(code: Code | number): void;
        setId(id: number): void;
        setMaxAge(maxAge: number): void;
        setPayload(payload: Buffer | string): void;
        setTimestamp(timestamp?: number): void;
        setToken(token: Buffer): void;
        setType(type: Type | number): void;
        setUri(uri: string): void;
        setUriQuery(uriQuery: string): void;
        toBuffer(): Buffer;
        toJSON(): any;
        toPrettyString(): string;
        toString(): string;


        static Code: { [P in Code]: number };
        static Type: { [P in Type]: number };
        static Option: { [P in Option]: number };
        static fromBuffer(buffer: Buffer): Message;
    }
}
