export default class DateFormatter {
    public static toRead(date: any) {
        if (date == null) {
            return "--/--/----";
        }
        try {
            const dateConverted = new Date(date);

            return `${dateConverted.getDate()}/${
                dateConverted.getMonth() + 1
            }/${dateConverted.getFullYear()}`;
        } catch {
            return "00/00/0000";
        }
    }
}
