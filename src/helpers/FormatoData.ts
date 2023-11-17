export default class FormatoData {
    public static formatarParaApi(data: any) {
        let localDate = new Date(data);
        return `${localDate.getFullYear()}-${localDate.getMonth()+1}-${localDate.getDate()} ${localDate.getHours()}:${localDate.getMinutes()}`;
    }
}
