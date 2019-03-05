export default class Utils {

    static isEmpty(val: any): boolean {
        return val === void 0 || val === null || `${val}`.trim() === '';
    }

    static isObject(obj: any): boolean {
        return typeof obj === 'object';
    }

    static isFunction(fn: any): boolean {
        return typeof fn === 'function';
    }

    static forIn(object: { [key: string]: any } = {}, cb: (val: any, key: string, object: { [key: string]: any }) => void = (() => {
    })): void {
        Object.keys(object).forEach((key: string) => {
            cb(object[key], key, object);
        });
    }

}
