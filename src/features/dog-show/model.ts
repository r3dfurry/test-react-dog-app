import { CALL_API } from "./middleware.api";

export interface IActionCommon {
    type: string,
    [key: string]: any;
}

export interface IActionAPI {
    [CALL_API]: {
        types: string[],
        endpoint: string,
    }
}

export type ActionPayload = IActionCommon | IActionAPI;

export function isActionAPI(object: ActionPayload) : object is IActionAPI {
    return (CALL_API in object && object[CALL_API].endpoint);
}

export interface IBreed {
    name: string;
    sub: string[];
}