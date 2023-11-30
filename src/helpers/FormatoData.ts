export default class FormatoData {
    public static formatarParaApi(data: any): Object {
        let localDate = new Date(data);
        return {
            data: `${localDate.getFullYear()}-${
                localDate.getMonth() + 1
            }-${localDate.getDate()}`,
            hora: `${localDate.getHours()}:${localDate.getMinutes()}`,
        };
    }

    public static formatarParaPadraoBrasil(data: any) {
        const aux = data.split("-");
        return `${aux[2]}/${aux[1]}/${aux[0]}`;
    }
}
