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

    static trimEachLine(text: string, trimEachLine?: boolean | 'tab' | 'space') {
        if (this.isEmpty(text)) return text;

        switch (trimEachLine) {
            case 'space':
                return text.replace(/^(?=\n)$|^[ ]+|[ ]+$/gm, '');
            case 'tab':
                return text.replace(/^(?=\n)$|^\t+|\t+$/gm, '');
            case true:
                return text.replace(/^(?=\n)$|^\s+|\s+$/gm, '');
            default:
                return text;
        }

    }
}