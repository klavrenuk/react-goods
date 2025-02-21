import type { ErrorResponse } from '@/types/error';

export const getRespErrorMessage = (error:ErrorResponse, errorDefault?:string) => {
    const errorMessageDefault = errorDefault || 'Ошибка. Попробуйте еще раз';
    return error?.response?.data?.message || errorMessageDefault;
}