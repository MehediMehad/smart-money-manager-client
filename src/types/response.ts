type TMeta = {
    limit: number;
    page: number;
    total: number;
    totalPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
};

export type TApiResponse<T = null> = {
    success: boolean;
    statusCode?: number;
    message: string;
    meta?: TMeta;
    data?: T;
};