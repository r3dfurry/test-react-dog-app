import { CALL_API } from "./middleware.api";

export interface IActionCommon {
    type: string,
    [key: string]: any;
}

export interface IActionAPI {
    [CALL_API]: {
        types: Array<string | IActionTypeWithCallBack>,
        endpoint: string,
    },
    [key: string]: any;
}

export interface IActionTypeWithCallBack {
    name: string;
    callback: (response: any) => (dispatch: any)  => {}
}

export function isIActionTypeWithCallBack(object: any) : object is IActionTypeWithCallBack {
    return !!object.name && (typeof object.callback === 'function');
}

export type ActionPayload = IActionCommon | IActionAPI;

export function isActionAPI(object: ActionPayload) : object is IActionAPI {
    return (CALL_API in object && object[CALL_API].endpoint);
}

export function isActionCommon(object: any) : object is IActionCommon {
    return (!!object.type);
}

export interface IBreed {
    name: string;
    selectedSub?: string;
    sub: string[];
}

export const EmptyBreed: IBreed = {
    name: '',
    sub: []
}
export function isBreed(object: any) : object is IBreed {
    return (!!object.name && !!object.sub && Array.isArray(object.sub));
}
export function isBreedsArray(object: any) : object is IBreed[] {
    return (object.length && object.length > 0);
}