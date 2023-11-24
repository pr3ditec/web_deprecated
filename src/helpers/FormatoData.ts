export default class FormatoData {
    public static formatarParaApi(data: any):Object {
        let localDate = new Date(data);
        return {
            data: `${localDate.getFullYear()}-${localDate.getMonth()+1}-${localDate.getDate()}`,
            hora: `${localDate.getHours()}:${localDate.getMinutes()}`
        }
    }
}
