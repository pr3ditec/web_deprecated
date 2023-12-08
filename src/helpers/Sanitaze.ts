export default class Sanitaze {
    constructor() {}

    public static clearItems(dataArray: Object): any {
        const keys = Object.keys(dataArray);
        keys.forEach((key) => {
            dataArray[key] = "";
        });
        return dataArray;
    }
}
