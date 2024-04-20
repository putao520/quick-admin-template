export type TrpcResult<T = unknown> = {
    code: 'error' | 'success' | 'pending' | 'unauthorized' | 'forbidden' | 'notFound' | 'badRequest' | 'internalServerError' | 'serviceUnavailable' | 'gatewayTimeout' | 'unknown';
    message?: string;
    data?: T;
    total?: number;
    keyToken?: string;
}
